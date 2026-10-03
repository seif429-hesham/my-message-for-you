 document.addEventListener('DOMContentLoaded', () => {

    // 1. توليد القلوب المتساقطة
    const heartsContainer = document.getElementById('hearts-container');
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's';
        heart.style.fontSize = Math.random() * 15 + 15 + 'px';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    setInterval(createHeart, 300);

    // 2. التحكم في الأغنية والضغط على ختم القلب
    const heartSealBtn = document.getElementById('heart-seal-btn');
    const bgMusic = document.getElementById('bg-music');
    const envelopeSection = document.getElementById('envelope-section');
    const messageSection = document.getElementById('message-section');

    const firstMessageText = "مش عارف أبدأ الكلام ده إزاي، بس في حاجات جوايا بقالها فترة حاسس إني مش قادر أفضل ساكت عنها… يمكن مش هقولها بشكل مباشر، ويمكن حتى الكلام مش هيوصل كل اللي حاسه، بس وجودك في حياتي بقى له معنى أكبر بكتير مما تتخيلي، وبقيت ألاحظ إن في تفاصيل كتير في يومي بتاخد شكل مختلف لمجرد إنك موجودة فيها.";

    heartSealBtn.addEventListener('click', () => {
        // تشغيل الموسيقى
        bgMusic.play().catch(err => {
            console.log("تنبيه: يتطلب متصفحك التفاعل لتشغيل الصوت تلقائياً", err);
        });

        // الانتقال للرسالة الأولى
        envelopeSection.classList.add('hidden');
        messageSection.classList.remove('hidden');

        // البدء في كتابة النص حرفاً بحرف
        typeWriterEffect(firstMessageText, 'typed-text', () => {
            startTwentySecondTimer();
        });
    });

    // دالة التأثير التدريجي للكتابة
    function typeWriterEffect(text, elementId, callback) {
        let index = 0;
        const speed = 65;
        const container = document.getElementById(elementId);
        container.innerHTML = "";

        function type() {
            if (index < text.length) {
                container.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    // 3. عداد الـ 20 ثانية لاختفاء الرسالة
    function startTwentySecondTimer() {
        const timerNotice = document.getElementById('countdown-timer-notice');
        const timerDisplay = document.getElementById('read-timer');
        timerNotice.classList.remove('hidden');

        let totalSeconds = 20; // تم التعديل إلى 20 ثانية

        const interval = setInterval(() => {
            totalSeconds--;
            let mins = Math.floor(totalSeconds / 60);
            let secs = totalSeconds % 60;

            timerDisplay.textContent = 
                `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;

            if (totalSeconds <= 0) {
                clearInterval(interval);
                // إخفاء الرسالة الأولى وإظهار شاشة الباسورد
                messageSection.classList.add('hidden');
                document.getElementById('password-section').classList.remove('hidden');
            }
        }, 1000);
    }

    // 4. التحكم في شاشة كلمة السر
    const passInput = document.getElementById('pass-input');
    const passSubmitBtn = document.getElementById('pass-submit-btn');
    const errorMsg = document.getElementById('error-msg');
    const passwordSection = document.getElementById('password-section');
    const mainContentSection = document.getElementById('main-content-section');

    function checkPassword() {
        const enteredPass = passInput.value.trim();
        if (enteredPass.toLowerCase() === 'basmala') {
            passwordSection.classList.add('hidden');
            mainContentSection.classList.remove('hidden');
            startLiveCounter();
        } else {
            errorMsg.classList.remove('hidden');
        }
    }
 passSubmitBtn.addEventListener('click', checkPassword);
    passInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    // 5. العداد الزمني الحسابي من تاريخ 27/9/2025 الساعة 3:00 عصراً
    function startLiveCounter() {
        const startDate = new Date(2025, 8, 27, 15, 0, 0); 

        function updateCounter() {
            const now = new Date();
            const diffInMs = now - startDate;

            if (diffInMs < 0) {
                document.getElementById('months-val').textContent = "0";
                document.getElementById('days-val').textContent = "0";
                document.getElementById('hours-val').textContent = "00";
                document.getElementById('minutes-val').textContent = "00";
                document.getElementById('seconds-val').textContent = "00";
                return;
            }

            const secondsTotal = Math.floor(diffInMs / 1000);
            const minutesTotal = Math.floor(secondsTotal / 60);
            const hoursTotal = Math.floor(minutesTotal / 60);
            const daysTotal = Math.floor(hoursTotal / 24);

            const approxMonths = Math.floor(daysTotal / 30.4375);
            
            const hours = hoursTotal % 24;
            const minutes = minutesTotal % 60;
            const seconds = secondsTotal % 60;

            document.getElementById('months-val').textContent = approxMonths;
            document.getElementById('days-val').textContent = daysTotal;
            document.getElementById('hours-val').textContent = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes-val').textContent = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds-val').textContent = seconds < 10 ? '0' + seconds : seconds;
        }

        updateCounter();
        setInterval(updateCounter, 1000);
    }

});