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