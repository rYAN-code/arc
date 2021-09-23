import * as THREE from 'three';
import { line1, setCircleGroup, circleMesh, points, curveLine } from './build';
import { data } from './data';
import { arc } from './main'

let raycaster = new THREE.Raycaster();  //射线

function setPoint(event: any): THREE.Vector3 {
    let pointer = new THREE.Vector2();
    pointer.x = ((event.clientX) / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    return getPointFromGrid(pointer);
}

function threePoint() {
    removeModel();
    const group = new THREE.Group();
    let point1: THREE.Points, point2: THREE.Points, point3: THREE.Points;
    if(data.pointerStart3 !== new THREE.Vector3(0, 0, 0)){
        point1 = points(data.pointerStart3);
        group.add(point1)
    }
    if (data.pointerEnd3 !== new THREE.Vector3(0, 0, 0)){
        point2 = points(data.pointerEnd3);
        group.add(point2)
    }
    if (data.pointerSecond3.x !== 0){
        point3 = points(data.pointerSecond3);
        group.add(point3)
    }
    console.log(data.pointerSecond3);
    arc.group.add(group);
    arc.scene.add(arc.group);
}

function circleEvent(): void {
    const group = new THREE.Group();
    threePoint()
    let line = line1(data.pointerStart3, data.pointerEnd3);
    let circle = circleMesh(data.pointerEnd3.distanceTo(data.pointerStart3), 0, Math.PI * 2, data.pointerStart3);
    group.add(circle).add(line);
    arc.group.add(group);
    arc.scene.add(arc.group);
}

function pointRadiusEvent(): void {
    const group = new THREE.Group();
    threePoint();
    let curve = curveLine(data.pointerStart3.x, data.pointerStart3.y, data.pointerEnd3.distanceTo(data.pointerStart3), 0, Math.PI)
    group.add(curve);
    arc.group.add(group);
    arc.scene.add(arc.group);
}

function getPointFromGrid(point: THREE.Vector2): THREE.Vector3 {
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(point, arc.camera);

    const intersects = raycaster.intersectObject(arc.plane, true);
    // const intersects = raycaster.intersectObjects(arc.scene.children, true);
    if (intersects.length > 0) {
        const res = intersects.filter(function (res) {
            return res && res.object;
        })[0];
        return res.point;
    }
}

function removeModel() {
    let group_to_remove = [];
    // Three.js删除模型对象(.remove()和·dispose()方法)
    arc.group.traverse(function (obj) {
        if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            obj.material.dispose();
        }
        if (obj instanceof THREE.Group) {
            group_to_remove.push(obj)
        }
    })
    // 删除所有需要删除的group
    group_to_remove.forEach((items) => {
        arc.group.remove(items);
    })
    // arc.scene.traverse(function (obj) {
    //     if (obj instanceof THREE.Mesh) {
    //         obj.geometry.dispose();
    //         obj.material.dispose();
    //     }
    // })
    // console.log(arc.scene);

    // arc.scene.remove(arc.group)
}

export { setPoint, circleEvent, pointRadiusEvent }