/*
 * Este archivo es para establecer la url de la api
 * dependiendo si estamos en desarrollo o producción.
 * En desarrollo se usa localhost:5173,
 * en producción se usa la misma url de la página.
 */
let ApiUrl = "/";
if (window.location.href.includes("localhost:5173")) {
	ApiUrl = "http://localhost:3146/";
}

export { ApiUrl };
