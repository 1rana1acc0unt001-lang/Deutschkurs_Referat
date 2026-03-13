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

const container = document.querySelector('.presentation-container');
const progressBar = document.getElementById('progressBar');

container.addEventListener('scroll', () => {
    const scrollTop = container.scrollTop;
    const height = container.scrollHeight - container.clientHeight;
    const scrolled = (scrollTop / height) * 100;
    progressBar.style.width = scrolled + "%";
});