import * as THREE from 'three';

let update = {
    model: '无'
}

let data = {
    pointerStart3 : new THREE.Vector3(),
    pointerSecond3 : new THREE.Vector3(),
    pointerEnd3 : new THREE.Vector3(),
}

function angle(v1: THREE.Vector3, v2: THREE.Vector3){
    let v0 = new THREE.Vector3(1, 0, 0)
    let v3 = new THREE.Vector3();
    v3.subVectors(v2, v1);
    return Math.acos((v3.dot(v0)) / v3.length())
}

export { update, data }