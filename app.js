const express = require('express')
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();
const pageRouter = require('./routes/page');
const interviewRouter = require('./routes/interview');
const userRouter = require('./routes/user');
const getAppRouter = require('./routes/application');
const adminRouter = require('./routes/admin');
const passportConfig = require('./passport');
const { sequelize } = require('./models');

const app = express()
app.set('trust proxy', 1);
app.use(express.json());
passportConfig(); //패스포트 설정
app.set('portnumber', process.env.PORT || 3333);

sequelize.sync({ force: false })
	.then(() => {
		console.log('데이터베이스 연결 성공');
	})
	.catch((err) => {
		console.error(err);
	})

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.IVIS_SECRET));
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.IVIS_SECRET,
	proxy: true,
	cookie: {
		httpOnly: true,
		secure: true,
		domain: 'ivis.dev',
	},
	name: 'IVIS-sID',
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userRouter);
app.use('/api/application', getAppRouter);
app.use('/api/admin', adminRouter);
app.use('/api/interview', interviewRouter);

app.use((req, res, next) => {
	const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
});

app.post('/', (req, res, next) => {
	try {
		console.log(req, res);
	} catch {
		res.send('error!');
	}
});


app.listen(app.get('portnumber'), () => {
	console.log('listening on port number!')
});



