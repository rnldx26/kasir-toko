/* Lapisan native: aktif hanya di dalam APK (Capacitor). Di browser biasa file ini tidak melakukan apa-apa. */
(function(){
const C=window.Capacitor;if(!C||!C.isNativePlatform||!C.isNativePlatform())return;
const P=C.Plugins,PR=P.BluetoothPrinter||P.CapacitorBluetoothPrinter,BS=P.BarcodeScanner,FS=P.Filesystem,SH=P.Share;
let dev=null;
window.scan=async cb=>{try{
 if(BS.isGoogleBarcodeScannerModuleAvailable){const a=await BS.isGoogleBarcodeScannerModuleAvailable();if(!a.available){toast('Menyiapkan modul scanner...');await BS.installGoogleBarcodeScannerModule()}}
 const r=await BS.scan();if(r.barcodes&&r.barcodes.length)cb(r.barcodes[0].rawValue)
}catch(e){toast('Scan gagal: '+(e.message||e))}};
window.conn=async()=>{try{
 const {devices}=await PR.list();
 if(!devices.length)return toast('Belum ada printer terpasang. Pasangkan dulu di Pengaturan Bluetooth HP.');
 let i=0;if(devices.length>1)i=(parseInt(prompt(devices.map((d,k)=>(k+1)+'. '+d.name).join('\n')+'\n\nKetik nomor printer:','1'),10)||0)-1;
 const d=devices[i];if(!d)return;
 await PR.connect({address:d.address});dev=d;pname=d.name;
 if($('#ps'))$('#ps').textContent='Terhubung: '+pname;toast('Printer terhubung')
}catch(e){const m=String(e.message||e);toast(/BLUETOOTH|permission/i.test(m)?'Izin Bluetooth belum diberikan. Buka Info Aplikasi > Izin > Perangkat di sekitar > Izinkan.':'Gagal menyambung: '+m)}};
const o=window.out;
window.out=async L=>{if(D.store.mode!=='bt')return o(L);
 try{if(!dev)return toast('Printer belum tersambung. Sambungkan di tab Toko.');
  await PR.print({data:String.fromCharCode(...bytes(L))})}catch(e){toast('Gagal mencetak: '+(e.message||e))}};
window.dl=async(name,data)=>{try{
 const b64=data instanceof Blob?await new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result.split(',')[1]);f.readAsDataURL(data)}):btoa(unescape(encodeURIComponent(data)));
 const r=await FS.writeFile({path:name,data:b64,directory:'CACHE'});
 await SH.share({title:name,url:r.uri,dialogTitle:'Simpan atau kirim file'})
}catch(e){if(!/cancel/i.test(e.message||''))toast('Gagal menyimpan file')}};
})();
