const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// 使 index.html 可访问
app.use(express.static(__dirname));

// 使用 body-parser 中间件来解析请求体中的 JSON 数据
app.use(bodyParser.json());

let records = [];

app.post('/api/record', (req, res) => {
    const { farmerId, wasteType, weight } = req.body;
    const weightInKg = parseFloat(weight);
    const points = weightInKg * 10;

    const record = {
        farmerId,
        wasteType,
        weight: weightInKg,
        points,
        timestamp: new Date()
    };

    records.push(record);

    res.json({ message: '记录成功', points });
});

app.get('/api/records', (req, res) => {
    res.json(records);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});