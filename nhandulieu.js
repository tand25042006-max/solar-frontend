// ==========================================
// 1. CẤU HÌNH ĐƯỜNG DẪN API RENDER
// ==========================================
const API_URL = "https://esp32-backend-vqfp.onrender.com/api/data";

// ==========================================
// 2. XOÁ BỎ RÀO CẢN ĐĂNG NHẬP (NẾU CÓ) HOẶC XỬ LÝ CHUYỂN TAB
// ==========================================
// Thêm đoạn này để đảm bảo nếu trang web có form đăng nhập, nó sẽ chạy mượt mà
document.addEventListener("DOMContentLoaded", () => {
    // Tìm form đăng nhập của bạn (thường có id là login-form hoặc loginForm)
    const loginForm = document.querySelector("form") || document.getElementById("loginForm");
    
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Chặn hành vi load lại trang của form
            
            // Lấy tài khoản mật khẩu bạn nhập (sửa id cho đúng với file html của bạn nếu có)
            const taiKhoan = document.querySelector('input[type="text"]')?.value || "";
            const matKhau = document.querySelector('input[type="password"]')?.value || "";
            
            // Đoạn này bạn có thể sửa lại tài khoản/mật khẩu theo ý bạn
            if (taiKhoan === "tanvippro" || taiKhoan === "123456") { 
                alert("Đăng nhập thành công!");
                
                // Nếu giao diện của bạn dùng cơ chế Ẩn/Hiện bằng CSS (ví dụ ẩn form hiện bảng điều khiển)
                const loginBox = document.getElementById("login-container") || document.querySelector(".login-box");
                const mainDash = document.getElementById("main-dashboard") || document.querySelector(".container");
                
                if (loginBox && mainDash) {
                    loginBox.style.display = "none";   // Ẩn khung đăng nhập
                    mainDash.style.display = "block"; // Hiện màn hình Solar
                } else {
                    // Nếu giao diện của bạn chuyển hẳn sang trang khác thì dùng lệnh dưới:
                    // window.location.href = "dashboard.html"; 
                }
            } else {
                alert("Sai tài khoản hoặc mật khẩu!");
            }
        });
    }
});

// ==========================================
// 3. HÀM FETCH LẤY DỮ LIỆU SOLAR TỪ RENDER
// ==========================================
function loadSolarData() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error("Lỗi kết nối tới Render!");
            return response.json();
        })
        .then(data => {
            console.log("Dữ liệu Solar:", data);
            if (data && data.length > 0) {
                // Lấy bản ghi mới nhất ở cuối mảng dữ liệu do Supabase trả về
            const latest = data[data.length - 1]; 
                
                // Đổ dữ liệu vào các thẻ HTML tương ứng trên giao diện của bạn
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
        .catch(error => console.error("Lỗi cập nhật dữ liệu:", error));
}

// Chạy cập nhật dữ liệu liên tục sau mỗi 3 giây
setInterval(loadSolarData, 3000);
loadSolarData(); // Chạy lần đầu ngay khi mở trang
