/**
 * @author sunag / http://www.sunag.com.br/
 */

THREE.LuminanceNode = function ( rgb ) {

	THREE.TempNode.call( this, 'fv1' );

	this.rgb = rgb;

};

THREE.LuminanceNode.prototype = Object.create( THREE.TempNode.prototype );
THREE.LuminanceNode.prototype.constructor = THREE.LuminanceNode;
THREE.LuminanceNode.prototype.nodeType = "Luminance";

THREE.LuminanceNode.prototype.generate = function ( builder, output ) {

	builder.include( 'luminance_rgb' );

	return builder.format( 'luminance_rgb(' + this.rgb.build( builder, 'v3' ) + ')', this.getType( builder ), output );

};

THREE.LuminanceNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.rgb = this.rgb.toJSON( meta ).uuid;

	}

	return data;

};
