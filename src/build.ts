import * as THREE from 'three';

/**
 * 
 * @param v1 
 * @param v2 
 * @returns 
 */
function line1(v1: THREE.Vector3, v2: THREE.Vector3): THREE.Line {
    let v_s = v1.clone();
    let v_e = v2.clone();
    v_s.z += 1;
    v_e.z += 1;
    const curve = new THREE.LineCurve3(v_s, v_e);
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(curve.getPoints(10))
    const material = new THREE.LineDashedMaterial({
        color: 0xff0000,
        linewidth: 1,
        scale: 1,
        dashSize: 3,
        gapSize: 10,
    });
    return new THREE.Line(geometry, material);//线条模型对象
}

function circleMesh(radius: number, thetaStart: number, thetaLength: number, pointCenter: THREE.Vector3): THREE.Mesh {
    const geometry = new THREE.CircleGeometry(radius, 64, thetaStart, thetaLength);
    geometry.translate(pointCenter.x, pointCenter.y, pointCenter.z);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const circle = new THREE.Mesh(geometry, material);
    return circle;
}

function curveLine(x: number, y: number, radius: number, startAngle: number, endAngle: number){
    let clockwise = false;
    let arc = new THREE.ArcCurve(x, y, radius, startAngle, endAngle, clockwise);
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(arc.getPoints(50))
    const material = new THREE.LineBasicMaterial({
        color: 0xff0000,
    });
    return new THREE.Line(geometry, material);//线条模型对象
}

function points(p: THREE.Vector3) {
    let a = p.clone()
    a.z += 1;
    let arr = [a];
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(arr);
    const material = new THREE.PointsMaterial({
        color: 0xff0000,
        size: 5.0 //点对象像素尺寸
    }); //材质对象
    const points = new THREE.Points(geometry, material); //点模型对象
    return points;
}

// function shapeMesh() {
//     const arr = toShapeArr(circleMesh());
//     let shape = new THREE.Shape(arr);
//     const extrudeSettings = {
//         steps: 2,
//         depth: 1,
//         bevelEnabled: false,
//     }
//     const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const mesh = new THREE.Mesh(geometry, material);
// }

function toShapeArr(model): THREE.Vector2[] {
    let arr = model.geometry.attributes.position.array;
    let filterArr = [];
    for (let i = 0; i < arr.length; i += 3) {
        filterArr.push(new THREE.Vector2(arr[i], arr[i + 1]))
    }
    return filterArr;
}

function setCircleGroup() {
    // const circle = circleMesh(5, 0, Math.PI * 2,);

    // const group = new THREE.Group();
    // group.add(circle);
    // return group;
}

function planeMesh() {
    const geometry = new THREE.PlaneGeometry(50, 50);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    return plane
}

export { line1, setCircleGroup, circleMesh, points, planeMesh, curveLine }