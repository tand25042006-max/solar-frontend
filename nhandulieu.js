// ==========================================
// 1. CẤU HÌNH ĐƯỜNG DẪN API RENDER
// ==========================================
const API_URL = "https://esp32-backend-vqfp.onrender.com/api/data";

// ==========================================
// 2. HÀM XỬ LÝ ĐĂNG NHẬP KHỚP 100% VỚI INDEX.HTML CỦA BẠN
// ==========================================
function handleLogin() {
    // Lấy chính xác dữ liệu từ ID ô nhập trên giao diện của bạn
    const userField = document.getElementById("txt-username");
    const passField = document.getElementById("txt-password");
    const loginError = document.getElementById("login-error");

    const taiKhoan = userField ? userField.value.trim() : "";
    const matKhau = passField ? passField.value.trim() : "";

    // Cấu hình Tài khoản & Mật khẩu theo ý bạn (Ví dụ dưới đây là: tanvippro / 123456)
    if (taiKhoan === "tanvippro" && matKhau === "123456") {
        alert("Đăng nhập thành công!");

        const khungLogin = document.getElementById("login-screen");
        const khungSolar = document.getElementById("main-dashboard");

        if (khungLogin && khungSolar) {
            khungLogin.style.display = "none";     // Ẩn màn hình đăng nhập
            khungSolar.style.display = "block";    // Mở toang giao diện Solar chính
            
            // Chạy lấy dữ liệu từ Render/Supabase đổ lên các ô số ngay lập tức
            loadSolarData();
        }
    } else {
        // Nếu sai, hiển thị dòng chữ báo lỗi màu đỏ có sẵn trên giao diện của bạn
        if (loginError) {
            loginError.style.display = "block";
            loginError.innerText = "Thông tin đăng nhập chưa đúng, vui lòng nhập lại!";
        } else {
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    }
}

// ==========================================
// 3. HÀM FETCH LẤY DỮ LIỆU SOLAR TỪ RENDER & SUPABASE
// ==========================================
function loadSolarData() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error("Lỗi kết nối tới Render!");
            return response.json();
        })
        .then(data => {
            console.log("Dữ liệu Solar nhận về:", data);
            if (data && data.length > 0) {
                // Supabase trả về mảng, lấy bản ghi mới nhất nằm ở cuối mảng
                const latest = data[data.length - 1]; 
                
                // Đổ số liệu vào các thẻ ID hiển thị tương ứng trên màn hình của bạn
                if(document.getElementById("dien-ap")) {
                    document.getElementById("dien-ap").innerText = latest.dien_ap ? latest.dien_ap.toFixed(1) + " V" : "0.0 V";
                }
                if(document.getElementById("dong-dien")) {
                    document.getElementById("dong-dien").innerText = latest.dong_dien ? latest.dong_dien.toFixed(2) + " A" : "0.00 A";
                }
                if(document.getElementById("cong-suat")) {
                    document.getElementById("cong-suat").innerText = latest.cong_suat ? latest.cong_suat.toFixed(1) + " W" : "0.0 W";
                }
                if(document.getElementById("nhiet-do")) {
                    document.getElementById("nhiet-do").innerText = latest.nhiet_do ? latest.nhiet_do + " °C" : "-- °C";
                }
            }
        })
        .catch(error => console.error("Lỗi cập nhật dữ liệu từ Render:", error));
}

// Cứ 3 giây hệ thống tự động tải lại dữ liệu từ ESP32 một lần để cập nhật số mới
setInterval(loadSolarData, 3000);

// Đảm bảo ẩn dòng thông báo lỗi đăng nhập đỏ khi vừa load trang
document.addEventListener("DOMContentLoaded", () => {
    const loginError = document.getElementById("login-error");
    if (loginError) loginError.style.display = "none";
});
