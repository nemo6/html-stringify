function isNum(x){
	return typeof x == "number" ? `${x}` : `"${x}"`
}

function type(x){
	let obj = { array: 0, object: 1 }
	let f = x => Object.prototype.toString.call(x).split(" ")[1].toLowerCase().slice(0,-1)
	let n = f(x)
	return obj[n]
}

function html_stringify( x, n = 0, o = { str : `<pre>` }, level=0, bracket=[{start:"[",end:"]"},{start:"{",end:"}"}], comma=true ){

	console.log( n, level )

	let T = type(x)

	o.str += " ".repeat(n) + ( bracket[T].start ) + `\n`

	if( T > 0 ){

		let obj = Object.entries(x)

		for( let [i,x] of obj.entries() ){

			let [k,v] = x

			let str_key = `"${k}": `
			
			o.str += " ".repeat(n+2) + str_key + isNum(v) + ( i != (obj.length-1) ? "," : "" ) + "\n"

		}
	}
	else
	( (obj) => {

		for( let [i,x] of obj.entries() ){

			html_stringify( x, n+2, o, level+1, bracket, ( i != (obj.length-1) ) )

		}

	})(x)

	o.str += " ".repeat(n) + ( bracket[T].end ) + ( comma && ( level != 0 ) ? "," : "" ) + "\n"

	if( level == 0 )
	o.str+="</pre>"

	return o.str

}
