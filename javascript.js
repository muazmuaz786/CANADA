const container = document.getElementById('canvas-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true
});
        
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const mapleCount = 15;
const snowflakeCount = 10;
const noteCount = 10;

const mapleObjects = [];
const snowflakeObjects = [];
const noteObjects = [];

const mapleTexture = textureLoader.load('maple.png');
const snowflakeTexture = textureLoader.load('snowflake.png');
const noteTexture = textureLoader.load('note.png');   


for (let i = 0; i < mapleCount; i++) {
    const mapleMaterial = new THREE.SpriteMaterial({ 
        map: mapleTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });
    
    const maple = new THREE.Sprite(mapleMaterial);
    maple.scale.set(2, 2, 2);
    
    maple.position.x = (Math.random() - 0.5) * 20;
    maple.position.y = (Math.random() - 0.5) * 10;
    maple.position.z = (Math.random() - 0.5) * 10;
    
    maple.userData = {
        speedX: Math.random() * 0.3 - 0.025,
        speedY: Math.random() * 0.3 - 0.025,
        speedZ: Math.random() * 0.3 - 0.025,
        rotationSpeed: Math.random() * 0.05 - 0.025
    };
    
    scene.add(maple);
    mapleObjects.push(maple);
}

for (let i = 0; i < snowflakeCount; i++) {
    const snowflakeMaterial = new THREE.SpriteMaterial({ 
        map: snowflakeTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });
    
    const snowflake = new THREE.Sprite(snowflakeMaterial);
    snowflake.scale.set(2, 2, 2);
    
    snowflake.position.x = (Math.random() - 0.5) * 20;
    snowflake.position.y = (Math.random() - 0.5) * 10;
    snowflake.position.z = (Math.random() - 0.5) * 10;
    
    snowflake.userData = {
        speedX: Math.random() * 0.3 - 0.025,
        speedY: Math.random() * 0.3 - 0.025,
        speedZ: Math.random() * 0.3 - 0.025,
        rotationSpeed: Math.random() * 0.05 - 0.025
    };
    
    scene.add(snowflake);
    snowflakeObjects.push(snowflake);
}

for (let i = 0; i < noteCount; i++) {
    const noteMaterial = new THREE.SpriteMaterial({ 
        map: noteTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });
    
    const note = new THREE.Sprite(noteMaterial);
    note.scale.set(2, 2, 2);
    
    note.position.x = (Math.random() - 0.5) * 20;
    note.position.y = (Math.random() - 0.5) * 10;
    note.position.z = (Math.random() - 0.5) * 10;
    
    note.userData = {
        speedX: Math.random() * 0.3 - 0.025,
        speedY: Math.random() * 0.3 - 0.025,
        speedZ: Math.random() * 0.3 - 0.025,
        rotationSpeed: Math.random() * 0.05 - 0.025
    };
    
    scene.add(note);
    noteObjects.push(note);
}




// const fiberCount = 2000;
// const fiberGeometry = new THREE.BufferGeometry();
// const fiberPositions = new Float32Array(fiberCount * 3);
// const fiberColors = new Float32Array(fiberCount * 3);
// const fiberSizes = new Float32Array(fiberCount);
        
// for (let i = 0; i < fiberCount; i++) {
//     fiberPositions[i * 3] = (Math.random() - 0.5) * 30;
//     fiberPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
//     fiberPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;

//     fiberColors[i * 3] = Math.random() * 0.5 + 0.5;
//     fiberColors[i * 3 + 1] = Math.random() * 0.5 + 0.3;
//     fiberColors[i * 3 + 2] = Math.random() * 0.5 + 0.5;
    
//     fiberSizes[i] = Math.random() * 0.5 + 0.1;
// }

// fiberGeometry.setAttribute('position', new THREE.BufferAttribute(fiberPositions, 3));
// fiberGeometry.setAttribute('color', new THREE.BufferAttribute(fiberColors, 3));
// fiberGeometry.setAttribute('size', new THREE.BufferAttribute(fiberSizes, 1));

// const fiberMaterial = new THREE.PointsMaterial({
//     size: 0.2,
//     vertexColors: true,
//     transparent: true,
//     opacity: 0.8,
//     blending: THREE.AdditiveBlending,
//     sizeAttenuation: true
// });

// const fibers = new THREE.Points(fiberGeometry, fiberMaterial);
// scene.add(fibers);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);
        
camera.position.z = 20;
    
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();

    mapleObjects.forEach(maple => {
        maple.position.x += maple.userData.speedX;
        maple.position.y += maple.userData.speedY;
        maple.position.z += maple.userData.speedZ;
        
        if (Math.abs(maple.position.x) > 20) maple.userData.speedX *= -1;
        if (Math.abs(maple.position.y) > 15) maple.userData.speedY *= -1;
        if (Math.abs(maple.position.z) > 15) maple.userData.speedZ *= -1;
        
        maple.rotation.z += maple.userData.rotationSpeed;
    });

    snowflakeObjects.forEach(snowflake => {
        snowflake.position.x += snowflake.userData.speedX;
        snowflake.position.y += snowflake.userData.speedY;
        snowflake.position.z += snowflake.userData.speedZ;
        
        if (Math.abs(snowflake.position.x) > 20) snowflake.userData.speedX *= -1;
        if (Math.abs(snowflake.position.y) > 15) snowflake.userData.speedY *= -1;
        if (Math.abs(snowflake.position.z) > 15) snowflake.userData.speedZ *= -1;
        
        snowflake.rotation.z += snowflake.userData.rotationSpeed;
    });

    noteObjects.forEach(note => {
        note.position.x += note.userData.speedX;
        note.position.y += note.userData.speedY;
        note.position.z += note.userData.speedZ;
        
        if (Math.abs(note.position.x) > 20) note.userData.speedX *= -1;
        if (Math.abs(note.position.y) > 15) note.userData.speedY *= -1;
        if (Math.abs(note.position.z) > 15) note.userData.speedZ *= -1;
        
        note.rotation.z += note.userData.rotationSpeed;
    });
    
    camera.position.x = Math.sin(elapsedTime * 0.2) * 0.5;
    camera.position.y = Math.cos(elapsedTime * 0.3) * 0.3;
    
    renderer.render(scene, camera);
}

animate();



























// 3D 모델 관련 변수
let modelScene, modelCamera, modelRenderer, modelControls;
let currentModel = null;

// 3D 모델 초기화
function initModelViewer() {
    const modelContainer = document.getElementById('model-container');
    
    modelScene = new THREE.Scene();
    // 배경색을 밝게 변경
    modelScene.background = new THREE.Color(0xffffff);
    
    modelCamera = new THREE.PerspectiveCamera(75, modelContainer.clientWidth / modelContainer.clientHeight, 0.1, 1000);
    modelCamera.position.z = 5;
    
    // 안티앨리어싱과 물리 기반 렌더링 활성화
    modelRenderer = new THREE.WebGLRenderer({ 
        antialias: true,
        physicallyCorrectLights: true 
    });
    modelRenderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
    // 렌더러의 톤 매핑 설정 - 더 밝은 결과물
    modelRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    modelRenderer.toneMappingExposure = 1.5;
    modelContainer.appendChild(modelRenderer.domElement);
    
    // 조명 설정 개선
    // 주변광 강도 증가
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    modelScene.add(ambientLight);
    
    // 주 방향성 조명 강도 증가
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(1, 1, 1);
    modelScene.add(directionalLight);
    
    // 보조 방향성 조명 추가 (반대 방향에서 빛을 비춤)
    const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
    backLight.position.set(-1, 0.5, -1);
    modelScene.add(backLight);
    
    // 하단 조명 추가
    const bottomLight = new THREE.DirectionalLight(0xffffff, 0.6);
    bottomLight.position.set(0, -1, 0);
    modelScene.add(bottomLight);
    
    // 컨트롤 설정
    modelControls = new THREE.OrbitControls(modelCamera, modelRenderer.domElement);
    modelControls.enableDamping = true;
    modelControls.dampingFactor = 0.05;
    
    // 애니메이션 루프
    function animateModel() {
        requestAnimationFrame(animateModel);
        modelControls.update();
        modelRenderer.render(modelScene, modelCamera);
    }
    
    animateModel();
    
    // 창 크기 조절 대응
    window.addEventListener('resize', function() {
        modelCamera.aspect = modelContainer.clientWidth / modelContainer.clientHeight;
        modelCamera.updateProjectionMatrix();
        modelRenderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
    });
}

    // 모델 로드 함수
function loadModel(modelName) {
    // 기존 모델 제거
    if (currentModel) {
        modelScene.remove(currentModel);
        currentModel = null;
    }
    
    // GLTF 로더 생성
    const loader = new THREE.GLTFLoader();
    
    // 로딩 메시지 표시
    document.getElementById('loading-indicator')?.classList.remove('hidden');
    
    // 모델 경로 설정 (.gtlf 파일 사용)
    const modelPath = `models/${modelName}/${modelName}.gltf`;    
    // 모델 로드
    loader.load(
        modelPath,
        function(gltf) {
            currentModel = gltf.scene;
            
            // 모델 크기 조정
            const box = new THREE.Box3().setFromObject(currentModel);
            const size = box.getSize(new THREE.Vector3()).length();
            const scale = 2 / size; // 적절한 크기로 조정
            currentModel.scale.set(scale, scale, scale);
            
            // 모델 위치 중앙으로 조정
            const center = new THREE.Vector3();
            box.getCenter(center);
            currentModel.position.x = -center.x * scale;
            currentModel.position.y = -center.y * scale;
            currentModel.position.z = -center.z * scale;
            
            // 모델 재질 개선 - 더 밝게 보이도록 설정
            currentModel.traverse((node) => {
                if (node.isMesh && node.material) {
                    // 메이플 모델 특별 처리
                    if (modelName === 'maple') {
                        // 모든 재질에 대해 메이플 전용 설정 적용
                        if (Array.isArray(node.material)) {
                            node.material.forEach(mat => {
                                // 재질 이름에 'maple' 표시 추가
                                mat.name = 'maple_' + (mat.name || 'material');
                                // MeshStandardMaterial로 변환
                                if (!(mat instanceof THREE.MeshStandardMaterial)) {
                                    const newMat = new THREE.MeshStandardMaterial({
                                        color: 0xff0000,
                                        emissive: 0x330000,
                                        roughness: 0.3,
                                        metalness: 0.0
                                    });
                                    // 텍스처가 있으면 복사
                                    if (mat.map) newMat.map = mat.map;
                                    node.material = newMat;
                                } else {
                                    mat.color.setHex(0xff0000);
                                    mat.emissive.setHex(0x330000);
                                    mat.roughness = 0.3;
                                    mat.metalness = 0.0;
                                }
                            });
                        } else {
                            // 재질 이름에 'maple' 표시 추가
                            node.material.name = 'maple_' + (node.material.name || 'material');
                            // MeshStandardMaterial로 변환
                            if (!(node.material instanceof THREE.MeshStandardMaterial)) {
                                const newMat = new THREE.MeshStandardMaterial({
                                    color: 0xff0000,
                                    emissive: 0x330000,
                                    roughness: 0.3,
                                    metalness: 0.0
                                });
                                // 텍스처가 있으면 복사
                                if (node.material.map) newMat.map = node.material.map;
                                node.material = newMat;
                            } else {
                                node.material.color.setHex(0xff0000);
                                node.material.emissive.setHex(0x330000);
                                node.material.roughness = 0.3;
                                node.material.metalness = 0.0;
                            }
                        }
                    } else {
                        // 다른 모델들은 일반 처리
                        if (Array.isArray(node.material)) {
                            node.material.forEach(material => {
                                enhanceMaterial(material);
                            });
                        } else {
                            enhanceMaterial(node.material);
                        }
                    }
                }
            });
            
            // 씬에 모델 추가
            modelScene.add(currentModel);
            
            // 카메라 위치 재설정
            modelCamera.position.z = 5;
            modelControls.reset();
            
            // 로딩 메시지 숨기기
            document.getElementById('loading-indicator')?.classList.add('hidden');
        },
        // 로딩 중 콜백
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // 에러 콜백
        function(error) {
            console.error('모델 로드 중 오류 발생:', error);
            // 오류 시 기본 도형으로 대체
            const fallbackModel = createFallbackModel(modelName);
            currentModel = fallbackModel;
            modelScene.add(currentModel);
            
            // 로딩 메시지 숨기기
            document.getElementById('loading-indicator')?.classList.add('hidden');
        }
    );
}

    // 재질 향상 함수
function enhanceMaterial(material) {
    // 재질의 밝기 높이기
    if (material.map) {
        material.map.encoding = THREE.sRGBEncoding;
    }
    
    // 메이플 리프 관련 재질 특별 처리
    if (material.name && material.name.toLowerCase().includes('maple')) {
        // 메이플 리프는 매우 밝은 붉은색으로 설정
        material.color.setHex(0xff0000);
        if (material.emissive) {
            material.emissive.setHex(0x330000);
        }
        if (material.metalness !== undefined) {
            material.metalness = 0.0; // 메탈릭 효과 제거
            material.roughness = 0.3; // 적당한 광택
        }
        material.needsUpdate = true;
        return;
    }
    
    // 금속성 재질인 경우
    if (material.metalness !== undefined) {
        // 메이플 리프가 아닌 경우에만 금속성 조정
        if (!(material.name && material.name.toLowerCase().includes('maple'))) {
            // 약간의 금속성 추가 (너무 높이면 과도하게 반사됨)
            material.metalness = Math.min(material.metalness + 0.1, 1.0);
            // 거칠기 감소 (더 매끄럽게)
            material.roughness = Math.max(material.roughness - 0.2, 0);
        }
    }
    
    // 기본 재질인 경우에도 밝기 조정
    if (material.color) {
        // HSL로 변환해서 밝기만 증가시키기
        const hsl = {};
        material.color.getHSL(hsl);
        hsl.l = Math.min(hsl.l * 1.2, 1.0); // 밝기 20% 증가, 최대 1.0
        material.color.setHSL(hsl.h, hsl.s, hsl.l);
    }
    
    material.needsUpdate = true;
}

// 모델 로드 실패 시 대체 모델 생성하는 함수
function createFallbackModel(modelType) {
    let geometry, material, mesh;
    
    switch(modelType) {
        case 'beaver':
            geometry = new THREE.SphereGeometry(1, 32, 32);
            material = new THREE.MeshPhongMaterial({ 
                color: 0x8B4513,
                specular: 0x555555,
                shininess: 30
            });
            break;
            
        case 'maple':
            geometry = new THREE.CircleGeometry(1, 5);
            material = new THREE.MeshStandardMaterial({ 
                color: 0xd50303,
                emissive: 0x330000,
                roughness: 0.3,
                metalness: 0.0
            });
            break;
            
        case 'maplesyrup':
            geometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
            material = new THREE.MeshPhongMaterial({ 
                color: 0x8B0000,
                specular: 0xffffff,
                shininess: 100,
                transparent: true,
                opacity: 0.8
            });
            break;
            
        default:
            geometry = new THREE.BoxGeometry(1, 1, 1);
            material = new THREE.MeshPhongMaterial({ 
                color: 0xffffff,
                specular: 0x111111,
                shininess: 50
            });
    }
    
    mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

// 페이지 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 3D 모델 뷰어 초기화
    initModelViewer();
    
    // 버튼 이벤트 리스너 등록
    const modelButtons = document.querySelectorAll('.model-btn');
    modelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modelName = this.getAttribute('data-model');
            loadModel(modelName);
        });
    });
    
    // 기본 모델 로드
    loadModel('maple');
});