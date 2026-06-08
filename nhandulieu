// Đường link Render thực tế của bạn để lấy dữ liệu
const BACKEND_URL = "https://esp32-backend-vqfp.onrender.com/api/data";

function fetchSolarData() {
    fetch(BACKEND_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể kết nối tới Server Render");
            }
            return response.json();
        })
        .then(data => {
            console.log("Dữ liệu nhận về từ Render:", data);
            
            // CẬP NHẬT LÊN GIAO DIỆN WEB
            // Lưu ý: Bạn hãy kiểm tra lại file HTML của bạn xem các ID có tên là gì 
            // rồi thay thế "id-dien-ap", "id-dong-dien"... cho đúng nhé!
            if(document.getElementById("id-dien-ap")) {
                document.getElementById("id-dien-ap").innerText = data.voltage + " V";
            }
            if(document.getElementById("id-dong-dien")) {
                document.getElementById("id-dong-dien").innerText = data.current + " A";
            }
            if(document.getElementById("id-cong-suat")) {
                document.getElementById("id-cong-suat").innerText = data.power + " W";
            }
            if(document.getElementById("id-thoi-gian")) {
                document.getElementById("id-thoi-gian").innerText = "Cập nhật lúc: " + data.updatedAt;
            }
        })
        .catch(error => {
            console.error("Lỗi Fetch dữ liệu:", error);
        });
}

// Thiết lập tự động lấy dữ liệu mới sau mỗi 3 giây (3000ms)
setInterval(fetchSolarData, 3000);

// Tự động chạy ngay 1 lần khi vừa tải xong trang web
window.onload = fetchSolarData;
