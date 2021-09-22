import * as THREE from 'three';
import { Vector2 } from 'three';

function line1(): THREE.Line {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        2, 0, 2,
        4, 0, 4,
    ])
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    const material=new THREE.LineBasicMaterial({
        color:0xff0000 //线条颜色
    });
    return new THREE.Line(geometry,material);//线条模型对象
}

function toShape(model){
    let arr = model.geometry.attributes.position.array;
    let filterArr = [];
    for (let i = 0; i < arr.length; i += 3){
        filterArr.push(new Vector2(arr[i], arr[i + 2]))
    }
    return filterArr;
}

function setGroup(){
    const line = line1();
    toShape(line)

    const group = new THREE.Group();
    group.add(line);
    return group;
}

export { setGroup }