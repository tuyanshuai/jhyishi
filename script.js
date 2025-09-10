document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 表单提交处理
    const form = document.querySelector('.consultation-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const phone = form.querySelector('input[type="tel"]').value;
            const type = form.querySelector('select').value;
            const message = form.querySelector('textarea').value;
            
            // 简单验证
            if (!name || !phone) {
                alert('请填写姓名和手机号码');
                return;
            }
            
            if (!/^1[3-9]\d{9}$/.test(phone)) {
                alert('请填写正确的手机号码');
                return;
            }
            
            // 模拟提交成功
            alert('咨询信息已提交，我们将在1小时内回电！');
            form.reset();
        });
    }

    // 数字动画效果
    function animateCounter(element, start, end, duration) {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + (element.dataset.suffix || '');
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }

    // 滚动到统计数据时触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat h3');
                stats.forEach((stat, index) => {
                    const values = ['10', '1000', '98', '0'];
                    const suffixes = ['+', '+', '%', ''];
                    stat.dataset.suffix = suffixes[index];
                    animateCounter(stat, 0, parseInt(values[index]), 2000);
                });
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // 滚动时导航栏效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });

    // 移动端导航菜单
    const nav = document.querySelector('nav');
    const navToggle = document.createElement('button');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = '☰';
    navToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #2c5aa0;
        cursor: pointer;
    `;

    document.querySelector('header .container').appendChild(navToggle);

    navToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
    });

    // 移动端样式
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            .nav-toggle {
                display: block !important;
            }
            
            nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
            }
            
            nav.nav-open {
                max-height: 300px;
            }
            
            nav ul {
                flex-direction: column;
                padding: 1rem 0;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
});