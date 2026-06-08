// Link API lấy dữ liệu từ Backend Render của bạn
const API_URL = "https://esp32-backend-vqfp.onrender.com/api/data";

function loadSolarData() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Lỗi mạng khi kết nối tới Render!");
            }
            return response.json();
        })
        .then(data => {
            console.log("Dữ liệu nhận từ Render:", data);
            
            if (data && data.length > 0) {
                // Supabase trả về một mảng, ta lấy phần tử mới nhất ở cuối mảng
                const latest = data[data.length - 1]; 
                
                // Đồng bộ chính xác tên các cột tiếng Việt từ Database lên giao diện web
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
        .catch(error => {
            console.error("Lỗi Fetch Frontend:", error);
        });
}

// Cứ 3 giây tự động tải lại dữ liệu mới từ Render một lần
setInterval(loadSolarData, 3000);
loadSolarData(); // Chạy ngay lập tức khi mở trang web
