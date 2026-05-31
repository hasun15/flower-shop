// අපේ Node.js API එක තියෙන ලින්ක් එක
const API_URL = 'http://localhost:5000/api/flowers';

// පිටුව Load වෙද්දීම මල් ටික අරන් පෙන්වන්න ක්‍රියාත්මක වන Function එක
async function getFlowers() {
    try {
        // Backend API එකට කතා කරලා දත්ත ඉල්ලීම
        const response = await fetch(API_URL);
        const flowers = await response.json();

        const flowerListContainer = document.getElementById('flower-list');
        flowerListContainer.innerHTML = ''; // Loading message එක අයින් කිරීම

        // ලැබුණු මල් ලැයිස්තුව එකින් එක loop කරමින් HTML එකට එකතු කිරීම
        flowers.forEach(flower => {
            const card = document.createElement('div');
            card.className = 'flower-card';

            card.innerHTML = `
                <div class="flower-name">${flower.name}</div>
                <div class="flower-price">රු. ${flower.price}.00</div>
                <div class="flower-qty">ඉතිරි ප්‍රමාණය: ${flower.qty}</div>
            `;

            flowerListContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Data ගන්න කොට ප්‍රශ්නයක් වුණා:', error);
        document.getElementById('flower-list').innerHTML = 
            '<p style="color:red; text-align:center;">Backend Server එක වැඩ කරන්නේ නැත! (node index.js run කර ඇතිදැයි බලන්න)</p>';
    }
}
// Form එක Submit කරන විට ක්‍රියාත්මක වන කොටස
document.getElementById('flower-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // පිටුව Refresh වීම වැළැක්වීම

    // Form එකේ තියෙන දත්ත ටික ලබාගැනීම
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const qty = document.getElementById('qty').value;

    try {
        // Backend API එකට POST Request එකක් මඟින් දත්ත යැවීම
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                price: Number(price), // String එකක් ලෙස එන දත්ත Number කිරීම
                qty: Number(qty)
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message); // සාර්ථකයි කියලා Message එකක් පෙන්වීම
            document.getElementById('flower-form').reset(); // Form එක හිස් කිරීම
            getFlowers(); // අලුත් මලත් එක්කම ලැයිස්තුව නැවත Update කර පෙන්වීම
        } else {
            alert('දත්ත ඇතුළත් කිරීම අසාර්ථකයි!');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Backend Server එක සම්බන්ධ කරගත නොහැක!');
    }
});
// පිටුව ලෝඩ් වූ සැනින් ඉහත වැඩේ සිදුවීමට සැලැස්වීම
window.onload = getFlowers;