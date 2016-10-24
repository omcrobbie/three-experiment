import THREE from 'lib';
import Label from 'label';

export default class Sphere extends THREE.Mesh{
    constructor(size,x,y,z,labelText, hoverColor){
        let geometry = new THREE.SphereGeometry(size, 20, 10);
        let material = new THREE.MeshLambertMaterial();
        super(geometry, material);
        this.position.set(x,y,z);
        this.label = new Label(labelText, size);
        this.hoverColor = hoverColor;
    }
    updateLabel(camera){
        this.label.setPosition(this.position, camera);
    }
    clone(){
        let newMesh = new THREE.Mesh(this.geometry, this.material);
        let {x,y,z} = this.position;
        newMesh.position.set(x, y, z);
        return newMesh;
    }
    setHover(scene){
        this.hoverScene = scene;
    }
    hover(){
        if (!this.hoverScene.children.length)
            this.hoverScene.add(this.clone());
        //this.hoverEffect.render(this.hoverScene, this.hoverCamera, this.hoverColor);
    }
    clear(){
        this.hoverScene.children.forEach(child=>this.hoverScene.remove(child));
    }
}