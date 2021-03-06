/**
 * @author sunag / http://www.sunag.com.br/
 */

THREE.NoiseNode = function ( coord ) {

	THREE.TempNode.call( this, 'fv1' );

	this.coord = coord;

};

THREE.NoiseNode.prototype = Object.create( THREE.TempNode.prototype );
THREE.NoiseNode.prototype.constructor = THREE.NoiseNode;
THREE.NoiseNode.prototype.nodeType = "Noise";

THREE.NoiseNode.prototype.generate = function ( builder, output ) {

	builder.include( 'snoise' );

	return builder.format( 'snoise(' + this.coord.build( builder, 'v2' ) + ')', this.getType( builder ), output );

};

THREE.NoiseNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.coord = this.coord.toJSON( meta ).uuid;

	}

	return data;

};
