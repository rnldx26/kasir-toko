# Kasir Toko - proyek APK (Capacitor 6)

Isi: aplikasi kasir (www/index.html) + lapisan native (www/native.js) untuk scanner ML Kit, printer Bluetooth klasik (SPP), dan simpan/bagikan file.

## Cara 1 - build otomatis lewat GitHub (tanpa Android Studio)
1. Buat repositori baru di GitHub, unggah seluruh isi folder ini (termasuk folder .github).
2. Buka tab Actions, pilih "Build APK", klik Run workflow. Tunggu sekitar 5-10 menit.
3. Unduh artifact "kasir-toko-apk" lalu ekstrak. Pindahkan app-debug.apk ke HP dan pasang (izinkan "pasang dari sumber tidak dikenal").

## Cara 2 - build di komputer
Butuh Node.js 20, JDK 17, dan Android Studio.
    npm install
    npx cap add android
    npx cap sync android
    npx cap open android      (lalu Build > Build APK)
Atau lewat terminal: cd android && ./gradlew assembleDebug

## Memakai di HP
- Pasangkan printer termal lebih dulu di Pengaturan Bluetooth HP.
- Tab Toko: "Cara cetak" = Bluetooth langsung, lalu "Sambungkan printer Bluetooth" dan pilih printer.
- Printer yang didukung versi ini: Bluetooth klasik (SPP), yang paling umum pada printer termal 58 mm. Printer khusus BLE tidak didukung; pakai mode RawBT sebagai gantinya.
- Jika daftar printer kosong di Android 12 ke atas, buka Info Aplikasi > Izin dan aktifkan "Perangkat di sekitar".
- Simpan JPG/PDF/backup/CSV membuka menu bagikan, lalu pilih Simpan ke File/Drive atau kirim lewat WhatsApp.

## Catatan
Proyek ini belum dibuild atau diuji di perangkat. Nama plugin dan format data cetak plugin printer bisa perlu penyesuaian kecil di www/native.js. Ini APK debug (bukan untuk Play Store).
