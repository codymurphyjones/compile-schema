import { makeExecutableSchema } from 'graphql-tools';

var fs = require('fs');
var path = require('path');
const {getFilesAsJson} = require('dynamic-file-require');



function CreateResolvers(resolver_dir="", folder="./schema/") {
	let resolverDir = folder + resolver_dir;
	let filelist = getFilesAsJson(0, resolverDir, ['again array of files and folders to exclude']);
	
	var filtered = Object.keys(filelist).reduce(function (filtered, key) {
		let value = filelist[key][0];

		if (value.endsWith('.js')) filtered[key] = filelist[key];
		return filtered;
	}, {});
	
	let resolvers_obj = {};
	let query = {};
	
	Object.keys(filtered).forEach(function(key) {
		let api = require(filtered[key][0]).default;
		let objToMerge = {};
		
		if(key == "Query")
			query = { "Query": api };
		else
			objToMerge[key] = api;
		
		
		resolvers_obj = Object.assign(resolvers_obj, objToMerge);
	});

	return Object.assign(query,resolvers_obj);
}

function is_dir(path) {
    try {
        var stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}

function compileGraphQl(saveSchema,folder='./schema/',resolver_dir="", plugin=[]) {
	
	let schema = "";
	var myRe = /d(b+)d/g;

	var searchPattern = /([A-z_]*\.js|schema\.graphql)/;

	let items = fs.readdirSync(folder).filter(item => {
		
		let matches = item.match(searchPattern);
		if(matches == null)
				return true;

		return false;
	});

	
	for (var i=0; i<items.length; i++) {
			console.log(folder + items[i]);
			if(!is_dir(folder + items[i]) || folder + items[i] != folder + resolver_dir) {
				let data = fs.readFileSync(folder + items[i], 'utf8')
			
				for(let x = 0; x < plugin.length; x++) {
					data = plugin[x](data);
				}
			
				schema += data;
				schema += "\r\n\n";
			}
	}
 
	
	if(saveSchema) {
		fs.writeFileSync(folder + "schema.graphql", schema, {encoding:'utf8',flag:'w'});
	}
	
	return { typeDefs: schema };
}
 
export default function compileschema(folder='./schema/',resolver_dir="",saveSchema=true, plugin=[],main=makeExecutableSchema) {
	let resolvers = CreateResolvers(resolver_dir, folder);
	let { typeDefs } = compileGraphQl(saveSchema, folder, resolver_dir);

	
	return main({resolvers, typeDefs});
}