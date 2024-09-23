export const handleAuthError = (error) => {
  let errorMessage = "Terjadi kesalahan silahkan coba lagi";

  switch (error) {
    case "auth/email-already-in-use":
      errorMessage = "Email Sudah Terpakai";
      break;
    case "auth/invalid-email":
      errorMessage = "Email Tidak Valid";
      break;
    case "auth/weak-password":
      errorMessage = "Kata Sandi Terlalu Lemah";
      break;
    case "auth/user-not-found":
      errorMessage = "Akun Tidak Ditemukan!";
      break;
    case "auth/wrong-password":
      errorMessage = "Password Anda Salah!";
      break;
    case "auth/invalid-credential":
      errorMessage = "Password atau Email Anda Salah!";
      break;
    case "auth/network-request-failed":
      errorMessage = "Terjadi Kesalahan Jaringan, Silahkan Coba Lagi";
      break;
    case "auth/operation-not-allowed":
      errorMessage = "Operasi Tidak Diizinkan";
      break;
    case "auth/requires-recent-login":
      errorMessage = "Autentikasi Ulang Diperlukan. Silahkan Login Kembali.";
      break;
    case "auth/too-many-requests":
      errorMessage = "Terlalu Banyak Permintaan. Silahkan Coba Lagi Nanti.";
      break;
    case "auth/user-disabled":
      errorMessage = "Akun Telah Dinonaktifkan.";
      break;
    case "auth/invalid-verification-code":
      errorMessage = "Kode Verifikasi Tidak Valid.";
      break;
    case "auth/missing-verification-code":
      errorMessage = "Kode Verifikasi Tidak Ditemukan.";
      break;
    case "auth/missing-email":
      errorMessage = "Email Tidak Ditemukan.";
      break;
    case "auth/user-token-expired":
      errorMessage = "Sesi Telah Berakhir. Silahkan Login Kembali.";
      break;
    case "auth/account-exists-with-different-credential":
      errorMessage = "Akun Sudah Ada dengan Kredensial yang Berbeda.";
      break;
    case "auth/invalid-password":
      errorMessage = "Kata Sandi Tidak Valid.";
      break;
    default:
      console.error("Error", error);
      break;
  }

  return errorMessage;
};
