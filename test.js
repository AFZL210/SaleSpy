import wbm from 'wbm'

wbm.start().then(async () => {
    const phones = [918700209857];
    const message = 'Good Morning.';
    await wbm.send(phones, message);
    await wbm.end();
}).catch(err => console.log(err));