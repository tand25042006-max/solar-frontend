const API_URL = "https://esp32-backend-vqfp.onrender.com/api/data";

function handleLogin() {
    const userField = document.getElementById("txt-username");
    const passField = document.getElementById("txt-password");
    const loginError = document.getElementById("login-error");

    const taiKhoan = userField ? userField.value.trim() : "";
    const matKhau = passField ? passField.value.trim() : "";

    if (taiKhoan === "tanvippro" && matKhau === "123456") {
        alert("Đăng nhập thành công!");
        const khungLogin = document.getElementById("login-screen");
        const khungSolar = document.getElementById("main-dashboard");

        if (khungLogin && khungSolar) {
            khungLogin.style.display = "none";     
            khungSolar.style.display = "block";    
            loadSolarData();
        }
    } else {
        if (loginError) {
            loginError.style.display = "block";
            loginError.innerText = "Thông tin đăng nhập chưa đúng, vui lòng nhập lại!";
        } else {
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    }
}

function loadSolarData() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error("Lỗi kết nối tới Render!");
            return response.json();
        })
        .then(data => {
            console.log("Dữ liệu Solar:", data);
            if (data && data.length > 0) {
                const latest = data[data.length - 1]; 
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

setInterval(loadSolarData, 3000);

document.addEventListener("DOMContentLoaded", () => {
    const loginError = document.getElementById("login-error");
    if (loginError) loginError.style.display = "none";
});
