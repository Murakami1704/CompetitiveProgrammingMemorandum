// common.js
const components = {
    // ページ上部の共通ヘッダー
    header: `
        <header>
            <h1>競技プログラミング 備忘録</h1>
        </header>
    `,

    // プロフィール：引数で受け取ったパスを反映させる
    getProfile: (iconPath) => `
    <div class="writer-profile" style="display: flex; align-items: center; gap: 20px; padding: 20px; background: #f9f9f9; border-radius: 10px; border: 1px solid #eee;">
        <div class="writer-icon" style="flex-shrink: 0;">
            <img src="${iconPath}" alt="Writer Icon" style="width: 80px; height: 80px; border-radius: 10px; object-fit: cover; border: 2px solid #333;">
        </div>
        <div class="writer-info">
            <h4 style="margin: 0; font-size: 1.2em; color: #333;">
                Writer: <a href="https://murakami1704.github.io/portfolioMurakami1704/" target="_blank" rel="noopener noreferrer" style="color: #333; text-decoration: none; border-bottom: 1px solid #333;">Murakami1704</a>
            </h4>
            <p style="margin: 5px 0; color: #666; font-size: 0.9em;">死が無い高専生(5年)</p>
            <p style="margin: 0; line-height: 1.5;">
                プログラムが好きな人。最近制御に興味がある。(研究室は制御系)
            </p>
        </div>
    </div>
`,

    // 共通フッター
    footer: `
        <footer style="text-align: center; padding: 20px; color: #888; font-size: 0.8em;">
            &copy; 2026 競プロ備忘録. All Rights Reserved.
        </footer>
    `
};

// ナビゲーションを生成する関数（homePathを引数で受け取る）
function generateNav(homePath) {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    let tabs = '';
    if (page === "ABC456.html") {
        tabs = `
            <a href="#section-a" class="tab-item">A</a>
            <a href="#section-b" class="tab-item">B</a>
            <a href="#section-c" class="tab-item">C</a>
            <a href="#section-d" class="tab-item">D</a>
            <a href="#thoughts" class="tab-item">感想</a>
        `;
    } else if (page === "rhythm-game-dev.html") {
        tabs = `
            <a href="#intro" class="tab-item">概要</a>
            <a href="#logic" class="tab-item">判定ロジック</a>
            <a href="#summary" class="tab-item">まとめ</a>
        `;
    } else {
        tabs = `<span class="tab-item-text" style="padding: 10px 20px; color: #555;">Contents</span>`;
    }

    return `
        <nav class="nav-container">
            <div class="tab-menu">
                ${tabs}
            </div>
            <button id="menu-btn" class="menu-btn">☰</button>
        </nav>
        <div id="side-menu" class="side-menu">
            <div class="side-menu-header">
                <h3>メニュー</h3>
                <button id="close-btn" class="close-btn">×</button>
            </div>
            <div class="side-menu-links">
                <a href="${homePath}">🏠 ホームへ戻る</a>
                <hr>
                <p style="padding: 10px; font-size: 0.8em; color: #666;">その他のリンク</p>
            </div>
        </div>
        <div id="menu-overlay" class="menu-overlay"></div>
    `;
}

// 処理を一つのイベントリスナーにまとめる[cite: 6]
document.addEventListener('DOMContentLoaded', () => {
    // 1. 階層チェックとパスの決定
    const isSubPage = window.location.pathname.includes('/posts/');
    const iconPath = isSubPage ? '../assets/icon.png' : 'assets/icon.png';
    const homePath = isSubPage ? '../index.html' : 'index.html';

    // 2. 各パーツの注入
    const ids = {
        'header-placeholder': components.header,
        'nav-placeholder': generateNav(homePath),
        'profile-placeholder': components.getProfile(iconPath),
        'footer-placeholder': components.footer
    };

    for (const [id, html] of Object.entries(ids)) {
        const elem = document.getElementById(id);
        if (elem) elem.innerHTML = html;
    }

    // 3. サイドメニューの制御ロジック
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('menu-overlay');

    const toggleMenu = (open) => {
        if (sideMenu && overlay) {
            sideMenu.classList.toggle('open', open);
            overlay.classList.toggle('open', open);
        }
    };

    if (menuBtn) menuBtn.addEventListener('click', () => toggleMenu(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));
    if (overlay) overlay.addEventListener('click', () => toggleMenu(false));
});