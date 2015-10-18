/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.RenderPass = function (scene, camera, mirrorPlaneNormal) {
    this.scene = scene;
    this.camera = camera;
    this.mirrorPlaneNormal = mirrorPlaneNormal.clone();
    this.mirrorPlaneNormal.normalize();
};

THREE.RenderPass.prototype = {

    render: function (renderer, writeBuffer, readBuffer, delta) {
        var reflMat = new THREE.Matrix4();

        var mir = this.mirrorPlaneNormal;
        reflMat.set(1 - 2*mir.x*mir.x, -2*mir.x*mir.y, -2*mir.x*mir.z, 0,
            -2*mir.y*mir.x, 1 - 2*mir.y*mir.y, -2*mir.y*mir.z, 0,
            -2*mir.z*mir.x, -2*mir.z*mir.y, 1 - 2*mir.z*mir.z, 0,
            0, 0, 0, 1);

        //reflectionShader.uniforms.reflectionViewMatrix.value = reflMat.getInverse(reflMat.multiply(camera.matrixWorld));

        var faceCullingOld = renderer.getFaceCulling();

        renderer.setFaceCulling(THREE.CullFaceNone);
        renderer.render( this.scene, this.camera, readBuffer, this.clear );
        renderer.setFaceCulling(faceCullingOld);
    }

};
