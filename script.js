// スライドが画面内に入ったことを検知する
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 画面内に入ったら 'active' クラスを付与
            entry.target.classList.add('active');
        } else {
            // 画面外に出たらクラスを外す（繰り返したい場合）
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.5 }); // 50%以上見えたら発火

document.querySelectorAll('.slide').forEach(slide => {
    observer.observe(slide);
});

// ▼▼▼進行バーここから▼▼▼
const container = document.querySelector('.presentation-container');
const progressBar = document.getElementById('progressBar');

container.addEventListener('scroll', () => {
    const scrollTop = container.scrollTop;
    const height = container.scrollHeight - container.clientHeight;
    const scrolled = (scrollTop / height) * 100;
    progressBar.style.width = scrolled + "%";
});
// ▲▲▲進行バーここまで▲▲▲

// ▼▼▼言語選択ここから▼▼▼
const btns = {
    de : document.querySelector('#de'),
    en : document.querySelector('#en'),
    jp : document.querySelector('#jp')
};
const contents = {
    de : document.querySelectorAll('.de'),
    en : document.querySelectorAll('.en'),
    jp : document.querySelectorAll('.jp')
};
const btn_bg = document.querySelector('.language-btn-bg');

Object.keys(btns).forEach(key => {
    btns[key].addEventListener('click', () => {
        const ind=['de','en','jp'].indexOf(key);
        btn_bg.style.transform='translateX('+ind*3.675+'rem)';

        Object.values(contents).forEach(content => {
            content.forEach(con => {
                con.classList.remove('active');
            });
        });
        contents[key].forEach(con => {
            con.classList.add('active');
        });
    });
})
// ▲▲▲言語選択ここまで▲▲▲

// ▼▼▼ナビバーここから▼▼▼
const nav_btn=document.querySelector('#nav-btn');
const nav=document.querySelector('.side-nav');
nav_btn.addEventListener('click',() => {
    if(nav.classList.contains('active')){
        nav.classList.remove('active');
    }else{
        nav.classList.add('active');
    }
})
// ▲▲▲ナビバーここまで▲▲▲

const full_screen_btns=document.querySelectorAll('.full-screen-btn');
const body=document.querySelector('body');
full_screen_btns.forEach(btn => {
    btn.addEventListener('click',()=>{
        body.webkitRequestFullscreen()
    })
})

const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clearBtn');

// Canvasのサイズを画面に合わせる
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let drawing = false;

function startDrawing(e) {
    drawing = true;
    draw(e);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // 線をリセット
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#2563eb'; // --primary-color に合わせる

    // スクロールコンテナがある場合、座標がズレないよう clientX/Y を使用
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

// マウスイベント
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

// クリア機能
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// canvas設定ここまで
