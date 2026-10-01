const fs = require('fs');
const f = 'public/thought-data/data/classics.json';
const a = JSON.parse(fs.readFileSync(f, 'utf8'));
function add(o) { a.push(o); }
add({id:'mengzi-book',name:'孟子',nameEn:'Mencius',author:'孟子',era:'中国 · 战国',eraEn:'China',level:2,order:13,core:'记录孟子论辩，倡性善、养气、仁政与王道。',coreEn:'Mencius on innate goodness and humane kingship.',themes:['性善','仁政王道','民贵君轻'],influence:'宋后列为四书，塑成儒家正统。',related:['confucianism','mengzi','kongzi','lunyu'],sources:[{label:'《孟子》'}]});
