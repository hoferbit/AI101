/**
 * @author sunag / http://www.sunag.com.br/
 */

THREE.GLNode = function ( type ) {

	this.uuid = THREE.Math.generateUUID();

	this.name = "";
	this.allows = {};

	this.type = type;

	this.userData = {};

};

THREE.GLNode.prototype.isNode = true;

THREE.GLNode.prototype.parse = function ( builder, context ) {

	context = context || {};

	builder.parsing = true;

	var material = builder.material;

	this.build( builder.addCache( context.cache, context.requires ).addSlot( context.slot ), 'v4' );

	material.clearVertexNode();
	material.clearFragmentNode();

	builder.removeCache().removeSlot();

	builder.parsing = false;

};

THREE.GLNode.prototype.parseAndBuildCode = function ( builder, output, context ) {

	context = context || {};

	this.parse( builder, context );

	return this.buildCode( builder, output, context );

};

THREE.GLNode.prototype.buildCode = function ( builder, output, context ) {

	context = context || {};

	var material = builder.material;

	var data = { result: this.build( builder.addCache( context.cache, context.requires ).addSlot( context.slot ), output ) };

	if ( builder.isShader( 'vertex' ) ) data.code = material.clearVertexNode();
	else data.code = material.clearFragmentNode();

	builder.removeCache().removeSlot();

	return data;

};

THREE.GLNode.prototype.build = function ( builder, output, uuid ) {

	output = output || this.getType( builder, output );

	var material = builder.material, data = material.getDataNode( uuid || this.uuid );

	if ( builder.parsing ) this.appendDepsNode( builder, data, output );

	if ( this.allows[ builder.shader ] === false ) {

		throw new Error( 'Shader ' + shader + ' is not compatible with this node.' );

	}

	if ( material.nodes.indexOf( this ) === - 1 ) {

		material.nodes.push( this );

	}

	if ( this.updateFrame !== undefined && material.updaters.indexOf( this ) === - 1 ) {

		material.updaters.push( this );

	}

	return this.generate( builder, output, uuid );

};

THREE.GLNode.prototype.appendDepsNode = function ( builder, data, output ) {

	data.deps = ( data.deps || 0 ) + 1;

	var outputLen = builder.getFormatLength( output );

	if ( outputLen > ( data.outputMax || 0 ) || this.getType( builder, output ) ) {

		data.outputMax = outputLen;
		data.output = output;

	}

};

THREE.GLNode.prototype.getType = function ( builder, output ) {

	return output === 'sampler2D' || output === 'samplerCube' ? output : this.type;

};

THREE.GLNode.prototype.getJSONNode = function ( meta ) {

	var isRootObject = ( meta === undefined || typeof meta === 'string' );

	if ( ! isRootObject && meta.nodes[ this.uuid ] !== undefined ) {

		return meta.nodes[ this.uuid ];

	}

};

THREE.GLNode.prototype.createJSONNode = function ( meta ) {

	var isRootObject = ( meta === undefined || typeof meta === 'string' );

	var data = {};

	if ( typeof this.nodeType !== "string" ) throw new Error( "Node does not allow serialization." );

	data.uuid = this.uuid;
	data.type = this.nodeType + "Node";

	if ( this.name !== "" ) data.name = this.name;

	if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

	if ( ! isRootObject ) {

		meta.nodes[ this.uuid ] = data;

	}

	return data;

};

THREE.GLNode.prototype.toJSON = function ( meta ) {

	return this.getJSONNode( meta ) || this.createJSONNode( meta );

};
