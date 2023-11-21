module.exports = {
	apps: [
		{
			name: 'Asuna_Bot',
			script: './Asuna.js',
			autorestart: true,
			exec_mode: 'cluster',
			pmx: false,
			vizion: true,
			cwd: __dirname,
			instances: 1,
			watch: false,
			merge_logs: true,
			log_file: "main/logs/pm2_child.log",
			error_file: "main/logs/pm2_error.log",
			out_file: "main/logs/pm2_child_out.log",
			exec_interpreter: "node",
			args : 'config.json'
		}
	]
};