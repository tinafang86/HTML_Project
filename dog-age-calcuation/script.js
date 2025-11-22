document.addEventListener("DOMContentLoaded", () => {

    // ① 先抓 DOM
    const dogNameInput = document.getElementById("dogName");
    const birthDateInput = document.getElementById("birthDate");

    // ② 讀取 localStorage
    const savedName = localStorage.getItem("savedDogName");
    const savedBirth = localStorage.getItem("savedBirthDate");

    if (savedName) dogNameInput.value = savedName;
    if (savedBirth) birthDateInput.value = savedBirth;

    // ③ 寫入 localStorage（自動存）
    dogNameInput.addEventListener("input", () => {
        localStorage.setItem("savedDogName", dogNameInput.value);
    });

    birthDateInput.addEventListener("change", () => {
        localStorage.setItem("savedBirthDate", birthDateInput.value);
    });
});

// ==========================================
// Part 2: 您原本的計算功能 (保持不變)
// ==========================================

function calculate() {
    const name = document.getElementById("dogName").value.trim();
    const birth = document.getElementById("birthDate").value;
    const resultBox = document.getElementById("result");

    if (!name || !birth) {
        resultBox.style.display = "block";
        resultBox.textContent = "請填寫完整資訊。";
        return;
    }

    // 🐶 計算狗齡（天 → 年）
    const today = new Date();
    const dob = new Date(birth);
    const diffTime = today - dob;

    // 防止使用者選到未來的日期導致計算錯誤
    if (diffTime < 0) {
        resultBox.style.display = "block";
        resultBox.textContent = "出生日期不能是未來喔！";
        return;
    }

    const dogYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    // 取小數點後一位
    const dogAge = Math.round(dogYears * 10) / 10;

    // 🔬 UCSD Epigenetic Clock（主要科學公式）
    // human_age = 16 * ln(dog_age) + 31
    // 注意：這個公式在狗狗小於 1 歲時數值會比較奇怪 (ln(0.something) 是負數)，但在科學上是合理的
    let humanAge = 16 * Math.log(dogYears) + 31;

    // 處理剛出生的狗狗計算結果可能為負數或過小的情況 (例如小於幾週大)
    if (dogYears < 0.2) {
        // 針對極幼犬的顯示優化 (可選)
        humanAge = 0;
    }

    humanAge = Math.round(humanAge * 10) / 10;

    // 顯示結果
    resultBox.style.display = "block";
    resultBox.innerHTML = `
      <span>${name}</span> 現在大約 <strong>${dogAge}</strong> 歲狗年齡，
      </br>
      根據 UCSD DNA 甲基化研究換算為人類年齡大約是 <strong>${humanAge}</strong> 歲。
    `;
}