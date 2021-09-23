import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { update, data } from './data';
import { setPoint, circleEvent, pointRadiusEvent } from './event';
import { planeMesh } from './build';

const app = createApp(App).use(store).use(router).mount('#app')

class Arc {
    container = document.getElementById("container");
    camera: THREE.Camera;
    scene: THREE.Scene;
    width: number = this.container.clientWidth;
    height: number = this.container.clientHeight;
    point: THREE.PointLight;
    ambient: THREE.AmbientLight;
    renderer: THREE.WebGLRenderer;
    orbitControls: OrbitControls;
    group: THREE.Group;
    plane: THREE.Mesh;
    constructor() {
        this.init();
        this.animate();
    }
    init() {
        this.setScene();
        this.setCamera();
        this.setLight();
        this.setHelper();
        this.setGui();
        this.setMesh();
        this.setEvent();
        this.setRenderer();
        this.setController();
    }
    setScene() {
        this.scene = new THREE.Scene();
    }
    setCamera() {
        const k = this.width / this.height; //窗口宽高比
        const s = 10; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 0.1, 200);
        this.camera.position.set(0, 0, 150); //设置相机位置
        this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
    }
    setLight() {
        this.point = new THREE.PointLight(0xffffff); //点光源
        this.point.position.set(-800, 5000, 1000);   //点光源位置
        this.scene.add(this.point);
        this.ambient = new THREE.AmbientLight(0x444444);    //环境光
        this.scene.add(this.ambient);
    }
    setHelper() {
        let axes = new THREE.AxesHelper(300);
        // this.gridHelper = new THREE.GridHelper(300, 300);
        // this.gridHelper.rotateX(Math.PI / 2)
        // let plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 3)
        // this.planeHelper = new THREE.PlaneHelper(plane)
        this.scene.add(axes);
    }
    setController() {
        // OrbitControls
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.listenToKeyEvents(this.container);
        this.orbitControls.enableDamping = true;
    }
    setGui() {
        let gui = new GUI();
        gui.width = 300;
        gui.add(update, 'model', ['无', '圆', '圆心半径圆弧', '起点终点半径圆弧', '放样'])
    }
    setRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);//设置渲染区域尺寸
        this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        this.container.appendChild(this.renderer.domElement); //body元素中插入canvas对象
    }
    setMesh() {
        this.group = new THREE.Group();
        this.plane = planeMesh();
        this.group.add(this.plane);
        this.scene.add(this.group);
    }
    setEvent() {
        let _this = this;
        this.container.addEventListener('pointerdown', function (event) {
            // 若model不为无，关闭orbitcontrols，开启绘图模式
            if(update.model !== '无'){
                _this.orbitControls.saveState();
                _this.orbitControls.enabled = false; 
                data.pointerStart3 = setPoint(event);
                switch (update.model) {
                    case '圆': this.addEventListener('pointermove', move1); break;
                    case '圆心半径圆弧': this.addEventListener('pointermove', move2.bind(this));
                    // this.addEventListener('pointerdown', function(event){
                    //     threePoint();
                    // })
                    break;
                    case '起点终点半径圆弧': console.log(3); break;
                    case '放样': console.log(4); break;
                }
                this.addEventListener('pointerup', function(){
                    this.removeEventListener('pointermove', move1)
                    _this.orbitControls.enabled = true;
                    _this.orbitControls.reset();
                })
            }
        })
        function move1 (event: any) {
            data.pointerEnd3 = setPoint(event);
            circleEvent();
        }
        function move2 (event: any) {
            data.pointerSecond3 = setPoint(event)
            data.pointerEnd3 = setPoint(event)
            pointRadiusEvent();
        }

    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    }
}
let arc = new Arc();

export { arc }