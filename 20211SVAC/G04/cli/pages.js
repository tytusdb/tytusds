// FILE SYSTEM
const path = require('path')
const fs = require('fs')

// ARGUMENTOS
const args = process.argv
const pageName = args[2]

// ESCRIBIR ARCHIVO
const writeFile = (dirName, filename, content) => {
	fs.writeFile(
		path.resolve(`./${dirName}/pages/${pageName}/${filename}`),
		content,
		'utf-8',
		(err) => {
			if (err) console.log(err)
		},
	)
}

// ESCRIBIR CARPETA
const createDir = (dirName, cb) => {
	fs.mkdir(
		path.resolve(`./${dirName}/pages/${pageName}`),
		{ recursive: true },
		(err) => {
			if (err) console.log(err)
			else cb()
		},
	)
}

// CREAR PAGINA EN PUBLIC
fs.exists(path.resolve(`./public/pages/${pageName}/index.html`), (exists) => {
	if (!exists) {
		// ESCRIBIR CARPETA
		createDir('public', () => {
			writeFile(
				'public',
				'index.html',
				`<!DOCTYPE html>
				<html lang="es">
					<head>
						<title>${pageName}</title>
						<meta charset="UTF-8" />
						<meta name="viewport" content="width=device-width, initial-scale=1.0" />
						<meta http-equiv="X-UA-Compatible" content="ie=edge" />
						<link href="./styles.css" rel="stylesheet" />
						<link href="../../styles/pages.css" rel="stylesheet" />
						<link href="../../styles/global.css" rel="stylesheet" />
						<link href="../../icons/style.css" rel="stylesheet" />
						<link href="../../styles/normalize.css" rel="stylesheet" />
					</head>
					<body>
						<main>
							<nav>
								<div>
									<h1>${pageName}</h1>
									<ul>
										<li>
											<label for="array-json" class="btn"><i class="icon-upload-cloud"></i>Cargar</label>
											<input
												type="file"
												onchange="onChangeSortLoad(event)"
												id="array-json"
												style="display: none"
											/>
										</li>
										<li>
											<button type="button"><i class="icon-save"></i>Guardar</button>
										</li>
										<li>
											<button type="button">
												<i class="icon-fast-forward"></i>Velocidad
											</button>
										</li>
									</ul>
								</div>
								<ul>
									<li>
										<button class="reset" type="button">
											<i class="icon-repeat"></i>
										</button>
									</li>
									<li>
										<button type="button"><i class="icon-play"></i>Iniciar</button>
									</li>
								</ul>
							</nav>
							<svg width="100%" height="100%"></svg>
						</main>
						<script src="../../../scripts/utils/canvas.js"></script>
						<script src="../../../scripts/utils/sort.js"></script>
						<script src="../../../scripts/utils/colors.js"></script>
						<script src="../../../scripts/pages/${pageName}/index.js"></script>
					</body>
				</html>				
            `,
			)
			writeFile('public', 'styles.css', '')
		})

		// ESCRIBIR TYPESCRIPT
		createDir('lib', () => {
			writeFile('lib', 'index.ts', '')
		})
	} else console.log('Esta pagina ya existe')
})
