function Scatter(scene,xs,ys){

	for(var i=0;i<xs.length;i++){
		var x = xs[i]
		var y = ys[i]

		var geometry = new THREE.SphereGeometry( 0.01,50,50 );

		var material = new THREE.MeshBasicMaterial({color: 0xff8800,wireframe: false})

		var ball = new THREE.Mesh(geometry,material)

		ball.position.x = x
		ball.position.y = y


		scene.add(ball)

	}	
}