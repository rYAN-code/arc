import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { setGroup } from './build';
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

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
    constructor() {
        this.init();
        this.animate();
    }
    init() {
        this.setScene();
        this.setCamera();
        this.setLight();
        this.setHelper();
        this.setMesh();
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
        this.camera.position.set(0, 130, 0); //设置相机位置
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
        let gridHelper = new THREE.GridHelper(300, 300);
        this.scene.add(gridHelper);
    }
    setController() {
        // OrbitControls
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.listenToKeyEvents(this.container);
        this.orbitControls.enableDamping = true;
    }
    setRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);//设置渲染区域尺寸
        this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        this.container.appendChild(this.renderer.domElement); //body元素中插入canvas对象
    }
    setMesh() {
        this.group = setGroup();
        this.scene.add(this.group)
    }
    render(){
        this.renderer.render(this.scene, this.camera);
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    }
    
}
new Arc();