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
var current_language = 'de';

const de_btn = document.querySelector('#de');
const en_btn = document.querySelector('#en');
const ja_btn = document.querySelector('#ja');
const contents ={
    de : document.querySelectorAll('.de'),
    en : document.querySelectorAll('.en'),
    ja : document.querySelectorAll('.ja')
};

de_btn.addEventListener('click', () => {
    de_btn.classList.add('active');
    en_btn.classList.remove('active');
    ja_btn.classList.remove('active');
    contents.de.forEach(content=>{
        content.classList.add('active');
    });
    contents.en.forEach(content=>{
        content.classList.remove('active');
    });
    contents.ja.forEach(content=>{
        content.classList.remove('active');
    });
});
en_btn.addEventListener('click', () => {
    de_btn.classList.remove('active');
    en_btn.classList.add('active');
    ja_btn.classList.remove('active');
    contents.de.forEach(content=>{
        content.classList.remove('active');
    });
    contents.en.forEach(content=>{
        content.classList.add('active');
    });
    contents.ja.forEach(content=>{
        content.classList.remove('active');
    });
});
ja_btn.addEventListener('click', () => {
    de_btn.classList.remove('active');
    en_btn.classList.remove('active');
    ja_btn.classList.add('active');
    contents.de.forEach(content=>{
        content.classList.remove('active');
    });
    contents.en.forEach(content=>{
        content.classList.remove('active');
    });
    contents.ja.forEach(content=>{
        content.classList.add('active');
    });
})

// ▲▲▲言語選択ここまで▲▲▲