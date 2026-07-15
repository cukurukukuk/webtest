document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. EFEK TYPEWRITER ---
    const words = ["Creative Coder.", "Tech Explorer.", "Security Enthusiast."];
    let i = 0;
    let timer;

    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                document.getElementById('typewriter').innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000);
                return false;
            }
            timer = setTimeout(loopTyping, 100);
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                document.getElementById('typewriter').innerHTML = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0;
                }
                setTimeout(typingEffect, 500);
                return false;
            }
            timer = setTimeout(loopDeleting, 50);
        };
        loopDeleting();
    }

    typingEffect();


    // --- 2. INTERAKTIF TERMINAL ---
    const terminalInput = document.getElementById("terminal-input");
    const terminalHistory = document.getElementById("terminal-history");

    terminalInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            const command = this.value.trim().toLowerCase();
            const p = document.createElement("p");
            p.style.marginBottom = "8px";
            
            // Tampilkan kembali perintah yang diinput user
            p.innerHTML = `<span style="color:#ff007f">$</span> <span style="color:#fff">${this.value}</span><br>`;

            if (command === "help") {
                p.innerHTML += `Perintah yang tersedia:<br>
                - <span class="highlight">about</span> : Penjelasan singkat tentang saya<br>
                - <span class="highlight">skills</span> : Daftar skill teknis<br>
                - <span class="highlight">clear</span> : Membersihkan layar terminal`;
            } else if (command === "about") {
                p.innerHTML += `Saya tertarik pada dunia pemrograman, web design, dan pengujian keamanan aplikasi.`;
            } else if (command === "skills") {
                p.innerHTML += `Keahlian: HTML, CSS, JavaScript, Git, Linux Environment, & Problem Solving.`;
            } else if (command === "clear") {
                terminalHistory.innerHTML = "";
                this.value = "";
                return;
            } else if (command === "") {
                p.innerHTML = `<span style="color:#ff007f">$</span>`;
            } else {
                p.innerHTML += `Perintah tidak dikenal: "${command}". Ketik <span class="highlight">help</span> untuk daftar bantuan.`;
            }

            terminalHistory.appendChild(p);
            this.value = "";
            
            // Auto scroll ke bawah
            const body = document.getElementById("terminal-body");
            body.scrollTop = body.scrollHeight;
        }
    });


    // --- 3. BACKGROUND PARTIKEL INTERAKTIF (CANVAS) ---
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 60;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;

            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = "rgba(0, 240, 255, 0.4)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();
});
