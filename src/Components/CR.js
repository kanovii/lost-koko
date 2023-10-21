// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const app = express();
// const port = 3001;

// app.use(express.json());

// app.get('/searchCharacter', async (req, res) => {
//     const characterName = req.query.name;
//     const url = `https://lostark.game.onstove.com/Profile/Character?c=${characterName}`;

//     try {
//         const response = await axios.get(url);
//         const $ = cheerio.load(response.data);

//         // 웹 스크래핑을 통해 필요한 정보 추출
//         const characterInfo = {
//             name: characterName,
//             level: $('.profile-info .level').text(),
//             // 다른 정보 항목 추가
//         };

//         res.json(characterInfo);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to fetch character information' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
