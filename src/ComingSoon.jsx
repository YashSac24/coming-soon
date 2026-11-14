import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import './ComingSoon.css';

const ComingSoon = () => {
  const mountRef = useRef(null);

  // Loading state for the downloaded 3D City model & assets
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Real-time live local clock state
  const [currentTime, setCurrentTime] = useState({
    hours: '12',
    minutes: '00',
    seconds: '00',
    ampm: 'PM',
    dateStr: '',
    dayStr: '',
  });

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Clock Ticker Effect: Ticks current real-world local time accurately every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;

      const formattedHours = String(hours).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const dateStr = now.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const dayStr = now.toLocaleDateString(undefined, { weekday: 'short' });

      setCurrentTime({
        hours: formattedHours,
        minutes,
        seconds,
        ampm,
        dateStr,
        dayStr,
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4500);
      setEmail('');
    }
  };

  // Three.js 3D Real City, Construction Diorama & Animated Handyman
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene & Atmospheric Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0718);
    scene.fog = new THREE.FogExp2(0x0a0718, 0.004);

    // 2. Isometric Camera with Generous Distance
    const camera = new THREE.PerspectiveCamera(26, width / height, 1, 600);
    const cameraBase = new THREE.Vector3(76, 62, 76);
    const cameraTarget = new THREE.Vector3(10, 4, -4);
    camera.position.copy(cameraBase);
    camera.lookAt(cameraTarget);

    // Shift 3D city to the right half so text on left has perfectly framed breathing room
    if (width >= 960) {
      camera.setViewOffset(width, height, -width * 0.22, 0, width, height);
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Animation Mixers array
    const mixers = [];

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x4a4070, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.6);
    sunLight.position.set(50, 75, 35);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 260;
    sunLight.shadow.camera.left = -90;
    sunLight.shadow.camera.right = 90;
    sunLight.shadow.camera.top = 90;
    sunLight.shadow.camera.bottom = -90;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    // Cool Cyan Rim Light
    const rimLight = new THREE.DirectionalLight(0x00b0ff, 1.2);
    rimLight.position.set(-45, 40, -45);
    scene.add(rimLight);

    // Rooftop Welder Dynamic Flashing Light
    const welderLight = new THREE.PointLight(0x80d8ff, 0, 16);
    scene.add(welderLight);

    // Aviation Red Strobe Beacon Light
    const beaconLight = new THREE.PointLight(0xff1744, 1.4, 15);
    scene.add(beaconLight);

    // 4. Materials Palette
    const mats = {
      ground: new THREE.MeshStandardMaterial({ color: 0x120e24, roughness: 0.92 }),
      asphalt: new THREE.MeshStandardMaterial({ color: 0x1a202c, roughness: 0.85 }),
      curb: new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 }),
      roadLine: new THREE.MeshBasicMaterial({ color: 0xffffff }),
      crosswalk: new THREE.MeshBasicMaterial({ color: 0xfacc15 }),
      concrete: new THREE.MeshStandardMaterial({ color: 0x546e7a, roughness: 0.65, metalness: 0.1 }),
      darkBase: new THREE.MeshStandardMaterial({ color: 0x1e262e, roughness: 0.8 }),
      steelOrange: new THREE.MeshStandardMaterial({ color: 0xff6d00, roughness: 0.35, metalness: 0.4 }),
      craneYellow: new THREE.MeshStandardMaterial({ color: 0xffa000, roughness: 0.35, metalness: 0.25 }),
      glassBlue: new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.6, transparent: true, opacity: 0.82 }),
      darkGlass: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.15, metalness: 0.7 }),
      hazardYellow: new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
      taxiYellow: new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 }),
      carRed: new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 }),
      carBlue: new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3 }),
      carWhite: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 }),
      vanGreen: new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.35 }),
      tireBlack: new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 }),
      rimSilver: new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.6, roughness: 0.3 }),
      headlight: new THREE.MeshBasicMaterial({ color: 0xffffff }),
      taillight: new THREE.MeshBasicMaterial({ color: 0xf43f5e }),
      beacon: new THREE.MeshBasicMaterial({ color: 0xff1744 }),
      workerVest: new THREE.MeshStandardMaterial({ color: 0xff5722, roughness: 0.5 }),
      workerHelmet: new THREE.MeshStandardMaterial({ color: 0xffd600, roughness: 0.4 }),
      workerJeans: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 }),
    };

    // 5. Ground Foundation Plane
    const groundGeo = new THREE.PlaneGeometry(260, 260);
    const groundMesh = new THREE.Mesh(groundGeo, mats.ground);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.05;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // ============================================================
    // PROGRESSIVE LOW-RESOLUTION 3D MODEL (0KB INSTANT LOD 0)
    // Instant real 3D diorama geometry rendered at 0.0s while
    // the 12MB full high-detail city model streams in the background
    // ============================================================
    const lowResCityGroup = new THREE.Group();

    // Low-poly Central River Canal Water Plane
    const canalGeo = new THREE.PlaneGeometry(15, 110);
    const canalMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.1, metalness: 0.7 });
    const canalMesh = new THREE.Mesh(canalGeo, canalMat);
    canalMesh.rotation.x = -Math.PI / 2;
    canalMesh.rotation.z = Math.PI / 4;
    canalMesh.position.set(10, 0.02, 0);
    canalMesh.receiveShadow = true;
    lowResCityGroup.add(canalMesh);

    // Low-poly Waterfront Mountain / Rock Outcrop
    const rockGeo = new THREE.ConeGeometry(5.5, 6.5, 5);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x2e3440, roughness: 0.95 });
    const rock = new THREE.Mesh(rockGeo, rockMat);
    rock.position.set(-2, 3.0, 3);
    rock.castShadow = true;
    lowResCityGroup.add(rock);

    // 1. Uptown Residential Low-Poly District (Northwest)
    const uptownBlocks = [
      { x: -18, z: -22, w: 7, h: 4.5, d: 6, color: 0x334155 },
      { x: -10, z: -28, w: 6, h: 3.5, d: 5, color: 0x475569 },
      { x: -4, z: -20, w: 5, h: 5.0, d: 5, color: 0x3b4252 },
      { x: -14, z: -14, w: 6, h: 4.0, d: 6, color: 0x2e3440 },
      { x: -6, z: -12, w: 5, h: 3.8, d: 4, color: 0x434c5e },
      { x: 3, z: -18, w: 4, h: 4.2, d: 5, color: 0x4c566a },
      { x: -12, z: -32, w: 8, h: 3.0, d: 6, color: 0x334155 },
      { x: 0, z: -26, w: 5, h: 3.2, d: 5, color: 0x3b4252 },
    ];

    uptownBlocks.forEach((b) => {
      const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const mat = new THREE.MeshStandardMaterial({
        color: b.color,
        roughness: 0.8,
        metalness: 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(b.x, b.h / 2, b.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      lowResCityGroup.add(mesh);

      const roofGeo = new THREE.ConeGeometry(b.w * 0.58, 1.3, 4);
      roofGeo.rotateY(Math.PI / 4);
      const roofMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.set(b.x, b.h + 0.65, b.z);
      roof.castShadow = true;
      lowResCityGroup.add(roof);
    });

    // 2. Downtown Commercial High-Rise Skyscraper District (Southeast)
    const downtownTowers = [
      { x: 24, z: 8, w: 6.5, h: 18.0, d: 6.5, color: 0x1e293b, glow: 0x38bdf8 },
      { x: 33, z: 6, w: 7.0, h: 22.0, d: 7.0, color: 0x0f172a, glow: 0xffca28 },
      { x: 26, z: 18, w: 6.0, h: 15.0, d: 6.0, color: 0x1e2638, glow: 0x38bdf8 },
      { x: 36, z: 16, w: 6.5, h: 19.5, d: 6.5, color: 0x111827, glow: 0xf59e0b },
      { x: 42, z: 8, w: 5.5, h: 13.0, d: 5.5, color: 0x334155, glow: 0x38bdf8 },
      { x: 22, z: -1, w: 5.0, h: 12.0, d: 5.0, color: 0x1e293b, glow: 0xffca28 },
      { x: 38, z: 23, w: 6.0, h: 14.0, d: 5.5, color: 0x1f2937, glow: 0x38bdf8 },
    ];

    downtownTowers.forEach((t) => {
      const geo = new THREE.BoxGeometry(t.w, t.h, t.d);
      const mat = new THREE.MeshStandardMaterial({
        color: t.color,
        roughness: 0.4,
        metalness: 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(t.x, t.h / 2, t.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      lowResCityGroup.add(mesh);

      const crownGeo = new THREE.BoxGeometry(t.w * 0.85, 1.2, t.d * 0.85);
      const crownMat = new THREE.MeshBasicMaterial({ color: t.glow });
      const crown = new THREE.Mesh(crownGeo, crownMat);
      crown.position.set(t.x, t.h + 0.6, t.z);
      lowResCityGroup.add(crown);

      const spire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.25, 3.5, 6),
        mats.steelOrange
      );
      spire.position.set(t.x, t.h + 2.9, t.z);
      lowResCityGroup.add(spire);
    });

    scene.add(lowResCityGroup);

    // ============================================================
    // 6. 3D CITY LOADER SETUP WITH DRACO ACCELERATION & CACHE STORAGE
    // ============================================================
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    gltfLoader.setDRACOLoader(dracoLoader);

    const texLoader = new THREE.TextureLoader();

    // Texture Atlas for LowPoly City
    const cityTexture = texLoader.load('/models/city/color_2048x2048.jpg');
    cityTexture.colorSpace = THREE.SRGBColorSpace;
    cityTexture.flipY = false;

    const cityMaterial = new THREE.MeshStandardMaterial({
      map: cityTexture,
      roughness: 0.75,
      metalness: 0.1,
    });

    const CACHE_NAME = 'metropolis-model-cache-v1';

    const onModelLoaded = (gltf) => {
      const cityObj = gltf.scene;

      // Apply handcrafted low-poly game texture to all meshes
      cityObj.traverse((child) => {
        if (child.isMesh) {
          child.material = cityMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Compute bounds and scale so it fits the viewport comfortably
      const box = new THREE.Box3().setFromObject(cityObj);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.z);
      const targetScale = 175 / maxDim;
      cityObj.scale.set(targetScale, targetScale, targetScale);

      // Position city centered on ground, shifted to right-center
      cityObj.position.set(
        -center.x * targetScale + 12,
        -box.min.y * targetScale,
        -center.z * targetScale - 6
      );

      scene.add(cityObj);

      // Smoothly remove low-resolution 3D proxy now that full HD city is in place
      if (lowResCityGroup) {
        scene.remove(lowResCityGroup);
      }

      setLoadingProgress(100);
      setTimeout(() => setIsLoaded(true), 350);
    };

    const loadCity = async (modelUrl) => {
      // 1. Try Cache API for instant 50ms load on repeat visits
      if ('caches' in window) {
        try {
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(modelUrl);
          if (cachedResponse) {
            const blob = await cachedResponse.blob();
            const blobUrl = URL.createObjectURL(blob);
            setLoadingProgress(92);
            gltfLoader.load(
              blobUrl,
              (gltf) => {
                onModelLoaded(gltf);
                URL.revokeObjectURL(blobUrl);
              },
              undefined,
              () => {
                loadCityStandard(modelUrl);
              }
            );
            return;
          }
        } catch (e) {
          console.warn('Cache API lookup notice:', e);
        }
      }

      // 2. Standard loader with progressive telemetry & background caching
      loadCityStandard(modelUrl);
    };

    const loadCityStandard = (modelUrl) => {
      gltfLoader.load(
        modelUrl,
        (gltf) => {
          onModelLoaded(gltf);
          // Cache in background for instant subsequent visits
          if ('caches' in window) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.add(modelUrl).catch(() => {});
            });
          }
        },
        (xhr) => {
          if (xhr.total > 0) {
            setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100));
          } else if (xhr.loaded > 0) {
            const estimatedTotal = 12.5 * 1024 * 1024;
            const pct = Math.min(Math.round((xhr.loaded / estimatedTotal) * 100), 98);
            setLoadingProgress(pct);
          }
        },
        (err) => {
          console.warn('Could not load 3D city model:', err);
          if (mainJobsite) mainJobsite.visible = true;
          if (grandBridgeGroup) grandBridgeGroup.visible = true;
          vehicles.forEach((c) => { c.visible = true; });
          setIsLoaded(true);
        }
      );
    };

    // ============================================================
    // 7. ACTIVE CENTERPIECE CONSTRUCTION SITE WITH TOWER CRANE
    // ============================================================
    const mainJobsite = new THREE.Group();
    const siteBase = new THREE.Mesh(new THREE.BoxGeometry(13, 0.5, 13), mats.darkBase);
    siteBase.position.y = 0.25;
    siteBase.receiveShadow = true;
    mainJobsite.add(siteBase);

    // Hazard Stripes Perimeter
    const hazardBorder = new THREE.Mesh(new THREE.BoxGeometry(13.3, 0.3, 13.3), mats.hazardYellow);
    hazardBorder.position.y = 0.42;
    mainJobsite.add(hazardBorder);

    // Main 45° Building Under Active Construction
    const bldgCenter = new THREE.Group();

    // Level 0: Foundation
    const lvl0 = new THREE.Mesh(new THREE.BoxGeometry(7.5, 2.8, 7.5), mats.concrete);
    lvl0.position.y = 1.9;
    lvl0.castShadow = true;
    bldgCenter.add(lvl0);

    // Level 1: Glass Curtain Wall
    const lvl1 = new THREE.Mesh(new THREE.BoxGeometry(7.6, 2.8, 7.6), mats.glassBlue);
    lvl1.position.y = 4.7;
    lvl1.castShadow = true;
    bldgCenter.add(lvl1);

    // Level 2: Orange Steel Columns (Active Construction)
    const steelColumnsGroup = new THREE.Group();
    for (let cx = -3.2; cx <= 3.2; cx += 6.4) {
      for (let cz = -3.2; cz <= 3.2; cz += 6.4) {
        const col = new THREE.Mesh(new THREE.BoxGeometry(0.42, 2.8, 0.42), mats.steelOrange);
        col.position.set(cx, 7.5, cz);
        col.castShadow = true;
        steelColumnsGroup.add(col);

        // Rebars protruding from tops
        const rebar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.2, 4), mats.hazardYellow);
        rebar.position.set(cx, 9.4, cz);
        steelColumnsGroup.add(rebar);
      }
    }
    bldgCenter.add(steelColumnsGroup);

    // Rooftop Slab (Active welding location)
    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.35, 7.8), mats.concrete);
    roofSlab.position.y = 8.9;
    roofSlab.castShadow = true;
    roofSlab.receiveShadow = true;
    bldgCenter.add(roofSlab);

    // 3D Modular Scaffolding
    const scaffoldGroup = new THREE.Group();
    for (let sy = 1; sy <= 8; sy += 2.5) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 7.5), mats.concrete);
      plank.position.set(-4.4, sy, 0);
      scaffoldGroup.add(plank);
    }
    bldgCenter.add(scaffoldGroup);

    // 3D TOWER CRANE (Rotating, Trolley Moving, Swinging Beam!)
    const craneGroup = new THREE.Group();
    const mast = new THREE.Mesh(new THREE.BoxGeometry(0.65, 16, 0.65), mats.craneYellow);
    mast.position.set(4.6, 8, 4.6);
    mast.castShadow = true;
    craneGroup.add(mast);

    // Rotating Crane Jib Arm & Cabin
    const jibAssembly = new THREE.Group();
    jibAssembly.position.set(4.6, 16, 4.6);

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), mats.craneYellow);
    cabin.position.set(0, 0.4, 0);
    jibAssembly.add(cabin);

    // Jib Arm extending over building
    const arm = new THREE.Mesh(new THREE.BoxGeometry(14, 0.5, 0.5), mats.craneYellow);
    arm.position.set(-4.5, 1.4, 0);
    arm.castShadow = true;
    jibAssembly.add(arm);

    // Counterweight
    const weight = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.3, 1.0), mats.concrete);
    weight.position.set(4.5, 1.4, 0);
    jibAssembly.add(weight);

    // Beacon on Crane Apex
    const craneApex = new THREE.Mesh(new THREE.ConeGeometry(0.65, 2.0, 4), mats.craneYellow);
    craneApex.position.set(0, 2.0, 0);
    jibAssembly.add(craneApex);

    // Moving Trolley with Hoist Cable & Suspended Orange I-Beam
    const trolley = new THREE.Group();
    const trolleyBox = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.35, 0.7), mats.steelOrange);
    trolley.add(trolleyBox);

    const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 5.5, 4), mats.curb);
    cable.position.y = -2.75;
    trolley.add(cable);

    const beamGroup = new THREE.Group();
    beamGroup.position.y = -5.5;
    const suspendedBeam = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.35, 0.35), mats.steelOrange);
    suspendedBeam.castShadow = true;
    beamGroup.add(suspendedBeam);
    trolley.add(beamGroup);

    trolley.position.set(-4.5, 1.1, 0);
    jibAssembly.add(trolley);
    craneGroup.add(jibAssembly);
    mainJobsite.add(craneGroup);

    // Welder on Roof with Arc Flash Light
    const welder = new THREE.Group();
    const wBody = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.52, 0.3), mats.workerVest);
    wBody.position.y = 0.48;
    welder.add(wBody);
    const wLegs = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.42, 0.25), mats.workerJeans);
    wLegs.position.y = 0.21;
    welder.add(wLegs);
    const wHelmet = new THREE.Mesh(new THREE.SphereGeometry(0.24, 6, 6), mats.workerHelmet);
    wHelmet.position.y = 0.82;
    welder.add(wHelmet);
    welder.position.set(-1.6, 9.1, 1.6);
    bldgCenter.add(welder);
    welderLight.position.set(6.8, 10, 0.5);

    // Signalman on Roof
    const rigger = welder.clone();
    rigger.position.set(2.0, 9.1, -1.6);
    bldgCenter.add(rigger);

    // Scaffold Worker
    const scaffWorker = welder.clone();
    scaffWorker.position.set(-4.4, 6.0, 0.8);
    bldgCenter.add(scaffWorker);

    // Traffic Safety Cones around construction site
    for (let ci = -5; ci <= 5; ci += 2.5) {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.55, 8), mats.steelOrange);
      cone.position.set(ci, 0.3, 6.0);
      mainJobsite.add(cone);
    }

    mainJobsite.add(bldgCenter);
    mainJobsite.position.set(10, 0, -2);
    scene.add(mainJobsite);

    // ============================================================
    // 8. LOAD REAL ANIMATED HANDYMAN WORKER (FROM YOUR 3D ASSETS!)
    // ============================================================
    let handymanModel = null;
    const bodyTex = texLoader.load('/models/handyman/Handyman_Body_BaseColor_sRGB.png');
    const clothTex = texLoader.load('/models/handyman/Handyman_Cloth_BaseColorMask4.png');
    bodyTex.colorSpace = THREE.SRGBColorSpace;
    clothTex.colorSpace = THREE.SRGBColorSpace;

    const fbxLoader = new FBXLoader();
    fbxLoader.setResourcePath('/models/handyman/');
    fbxLoader.load(
      '/models/handyman/Handyman_walking_animation_ue4.fbx',
      (fbx) => {
        fbx.scale.set(0.0075, 0.0075, 0.0075);
        fbx.position.set(0, 0.3, 4.4);

        fbx.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            const isHead = child.name.toLowerCase().includes('head');
            child.material = new THREE.MeshStandardMaterial({
              map: isHead ? bodyTex : clothTex,
              roughness: 0.65,
              metalness: 0.1,
            });
          }
        });

        if (fbx.animations && fbx.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(fbx);
          const walkAction = mixer.clipAction(fbx.animations[0]);
          walkAction.play();
          mixers.push(mixer);
        }

        mainJobsite.add(fbx);
        handymanModel = fbx;
      },
      undefined,
      (err) => {
        console.warn('Could not load Handyman FBX:', err);
      }
    );

    // ============================================================
    // 9. LOAD REAL CONSTRUCTION SITE PROPS (FROM YOUR GLB ASSETS!)
    // ============================================================
    // Concrete Mixer Machine
    gltfLoader.load('/models/props/SM_ConcreteMixer_001.glb', (gltf) => {
      const mixerObj = gltf.scene;
      mixerObj.scale.set(0.75, 0.75, 0.75);
      mixerObj.position.set(4.2, 0.3, 3.8);
      mixerObj.rotation.y = -Math.PI / 4;
      mixerObj.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
        }
      });
      mainJobsite.add(mixerObj);
    });

    // Concrete Barriers
    gltfLoader.load('/models/props/SM_Concrete_Barriers.glb', (gltf) => {
      const barrier1 = gltf.scene;
      barrier1.scale.set(0.8, 0.8, 0.8);
      barrier1.position.set(-2.5, 0.3, 5.8);
      barrier1.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
        }
      });
      mainJobsite.add(barrier1);

      const barrier2 = barrier1.clone();
      barrier2.position.set(2.0, 0.3, 5.8);
      mainJobsite.add(barrier2);
    });

    // Cement Bags on Pallet
    gltfLoader.load('/models/props/SM_Cement_Bag_001b.glb', (gltf) => {
      const cement = gltf.scene;
      cement.scale.set(0.7, 0.7, 0.7);
      cement.position.set(5.5, 0.3, 2.5);
      cement.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
        }
      });
      mainJobsite.add(cement);
    });

    // Heavy Duty Work Bench
    gltfLoader.load('/models/props/SM_Working_Bench_001.glb', (gltf) => {
      const bench = gltf.scene;
      bench.scale.set(0.75, 0.75, 0.75);
      bench.position.set(-3.8, 0.3, 3.2);
      bench.rotation.y = Math.PI / 4;
      bench.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
        }
      });
      mainJobsite.add(bench);
    });

    // ============================================================
    // 10. GRAND METROPOLIS BRIDGE & WATERFRONT UNIFICATION
    // Bridges the two halves of the city across the river canal!
    // ============================================================
    const grandBridgeGroup = new THREE.Group();

    // Bridge Deck (Spans diagonally from Uptown to Downtown)
    // Span midpoint: (10, 1.25, 0), length: ~23, angle: PI/4
    const bridgeDeckLength = 23;
    const bridgeDeckWidth = 3.8;
    const bridgeDeck = new THREE.Mesh(
      new THREE.BoxGeometry(bridgeDeckWidth, 0.38, bridgeDeckLength),
      mats.asphalt
    );
    bridgeDeck.position.set(10, 1.25, 0);
    bridgeDeck.rotation.y = Math.PI / 4;
    bridgeDeck.castShadow = true;
    bridgeDeck.receiveShadow = true;
    grandBridgeGroup.add(bridgeDeck);

    // Concrete Curbs & Safety Barriers along Bridge
    const curbGeo = new THREE.BoxGeometry(0.35, 0.45, bridgeDeckLength);
    const leftCurb = new THREE.Mesh(curbGeo, mats.curb);
    leftCurb.position.set(-bridgeDeckWidth / 2 + 0.18, 0.35, 0);
    bridgeDeck.add(leftCurb);

    const rightCurb = new THREE.Mesh(curbGeo, mats.curb);
    rightCurb.position.set(bridgeDeckWidth / 2 - 0.18, 0.35, 0);
    bridgeDeck.add(rightCurb);

    // Bridge Yellow Centerline
    const yellowLineGeo = new THREE.BoxGeometry(0.12, 0.02, bridgeDeckLength - 1);
    const yellowLine = new THREE.Mesh(yellowLineGeo, mats.hazardYellow);
    yellowLine.position.y = 0.20;
    bridgeDeck.add(yellowLine);

    // Foundation Piers descending into riverbed
    const pierGeo = new THREE.BoxGeometry(1.6, 2.8, 1.6);
    const pier1 = new THREE.Mesh(pierGeo, mats.concrete);
    pier1.position.set(6, -0.15, -4);
    pier1.castShadow = true;
    pier1.receiveShadow = true;
    grandBridgeGroup.add(pier1);

    const pier2 = new THREE.Mesh(pierGeo, mats.concrete);
    pier2.position.set(14, -0.15, 4);
    pier2.castShadow = true;
    pier2.receiveShadow = true;
    grandBridgeGroup.add(pier2);

    // Twin Suspension Cable Towers (Pylons)
    const pylonGeo = new THREE.BoxGeometry(0.5, 7.5, 0.5);
    const crossbarGeo = new THREE.BoxGeometry(3.6, 0.35, 0.45);

    const makePylon = (px, pz) => {
      const pylonGroup = new THREE.Group();
      pylonGroup.position.set(px, 1.25, pz);
      pylonGroup.rotation.y = Math.PI / 4;

      const colLeft = new THREE.Mesh(pylonGeo, mats.steelOrange);
      colLeft.position.set(-1.6, 3.5, 0);
      colLeft.castShadow = true;
      pylonGroup.add(colLeft);

      const colRight = new THREE.Mesh(pylonGeo, mats.steelOrange);
      colRight.position.set(1.6, 3.5, 0);
      colRight.castShadow = true;
      pylonGroup.add(colRight);

      const bar = new THREE.Mesh(crossbarGeo, mats.steelOrange);
      bar.position.set(0, 6.2, 0);
      pylonGroup.add(bar);

      // Warning Beacon on top
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 6), mats.beacon);
      beacon.position.set(0, 7.4, 0);
      pylonGroup.add(beacon);

      return pylonGroup;
    };

    grandBridgeGroup.add(makePylon(7, -3));
    grandBridgeGroup.add(makePylon(13, 3));

    // River Waterfront Quays / Embankments
    const quayGeo = new THREE.BoxGeometry(1.2, 0.9, 18);
    const quay1 = new THREE.Mesh(quayGeo, mats.concrete);
    quay1.position.set(2.5, 0.4, -7);
    quay1.rotation.y = Math.PI / 4;
    quay1.receiveShadow = true;
    grandBridgeGroup.add(quay1);

    const quay2 = new THREE.Mesh(quayGeo, mats.concrete);
    quay2.position.set(17.5, 0.4, 7);
    quay2.rotation.y = Math.PI / 4;
    quay2.receiveShadow = true;
    grandBridgeGroup.add(quay2);

    // Animated River Tugboat / Barge in Canal
    const riverBoat = new THREE.Group();
    const boatHull = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.65, 4.8), mats.darkBase);
    boatHull.castShadow = true;
    riverBoat.add(boatHull);

    const boatCabin = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 2.0), mats.carWhite);
    boatCabin.position.set(0, 0.65, -0.4);
    riverBoat.add(boatCabin);

    const boatStack = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.8, 8), mats.steelOrange);
    boatStack.position.set(0, 1.3, -0.6);
    riverBoat.add(boatStack);

    riverBoat.position.set(13.5, 0.18, -6.5);
    riverBoat.rotation.y = Math.PI / 4;
    grandBridgeGroup.add(riverBoat);

    scene.add(grandBridgeGroup);

    // ============================================================
    // 11. ROADWAY VEHICLES (WAYPOINT CIRCUITS — NEVER IN WATER!)
    // ============================================================
    const vehicles = [];

    const createVehicle = ({ type, colorMat }) => {
      const car = new THREE.Group();

      const carBody = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.72, 1.05), colorMat);
      carBody.position.y = 0.52;
      carBody.castShadow = true;
      car.add(carBody);

      const cab = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.52, 0.92), mats.darkGlass);
      cab.position.set(-0.12, 1.02, 0);
      car.add(cab);

      // 4 Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.23, 0.23, 0.18, 10);
      wheelGeo.rotateX(Math.PI / 2);
      const wPositions = [
        [0.62, 0.23, 0.55],
        [0.62, 0.23, -0.55],
        [-0.62, 0.23, 0.55],
        [-0.62, 0.23, -0.55],
      ];
      wPositions.forEach(([wx, wy, wz]) => {
        const wheel = new THREE.Mesh(wheelGeo, mats.tireBlack);
        wheel.position.set(wx, wy, wz);
        car.add(wheel);
        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.19, 6), mats.rimSilver);
        rim.rotateX(Math.PI / 2);
        rim.position.set(wx, wy, wz);
        car.add(rim);
      });

      // Front Headlights
      const hl1 = new THREE.Mesh(new THREE.SphereGeometry(0.11, 6, 6), mats.headlight);
      hl1.position.set(1.08, 0.50, 0.32);
      const hl2 = hl1.clone();
      hl2.position.set(1.08, 0.50, -0.32);
      car.add(hl1);
      car.add(hl2);

      // Rear Taillights
      const tl1 = new THREE.Mesh(new THREE.SphereGeometry(0.11, 6, 6), mats.taillight);
      tl1.position.set(-1.08, 0.50, 0.32);
      const tl2 = tl1.clone();
      tl2.position.set(-1.08, 0.50, -0.32);
      car.add(tl1);
      car.add(tl2);

      if (type === 'taxi') {
        const sign = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.20, 0.26), mats.taxiYellow);
        sign.position.set(-0.12, 1.40, 0);
        car.add(sign);
      }

      scene.add(car);
      return car;
    };

    // Circuit 1: Downtown High-Rise Street Grid
    const downtownCircuit = [
      { x: 19, y: 0.38, z: 17 },
      { x: 37, y: 0.38, z: -1 },
      { x: 44, y: 0.38, z: 6 },
      { x: 26, y: 0.38, z: 24 },
    ];

    // Circuit 2: Uptown Residential Street Grid
    const uptownCircuit = [
      { x: -7, y: 0.38, z: -11 },
      { x: 7, y: 0.38, z: -25 },
      { x: 1, y: 0.38, z: -31 },
      { x: -13, y: 0.38, z: -17 },
    ];

    // Circuit 3: Grand Bridge Connecting Uptown & Downtown
    const bridgeWaypoints = [
      { x: 2, y: 0.40, z: -8 },
      { x: 7, y: 1.25, z: -3 },
      { x: 10, y: 1.35, z: 0 },
      { x: 13, y: 1.25, z: 3 },
      { x: 18, y: 0.40, z: 8 },
    ];

    // Vehicle 1: Yellow Taxi on Downtown Loop
    const taxi = createVehicle({ type: 'taxi', colorMat: mats.taxiYellow });
    taxi.userData = { mode: 'circuit', circuit: downtownCircuit, distance: 0, speed: 0.11 };
    vehicles.push(taxi);

    // Vehicle 2: Green Delivery Van on Downtown Loop (offset)
    const van = createVehicle({ type: 'van', colorMat: mats.vanGreen });
    van.userData = { mode: 'circuit', circuit: downtownCircuit, distance: 36, speed: 0.09 };
    vehicles.push(van);

    // Vehicle 3: Blue Sedan on Uptown Residential Loop
    const sedan = createVehicle({ type: 'sedan', colorMat: mats.carBlue });
    sedan.userData = { mode: 'circuit', circuit: uptownCircuit, distance: 12, speed: 0.10 };
    vehicles.push(sedan);

    // Vehicle 4: Red Sports Car Crossing the Grand Bridge between the two halves!
    const sportsCar = createVehicle({ type: 'sports', colorMat: mats.carRed });
    sportsCar.userData = { mode: 'bridge', t: 0, speed: 0.0035 };
    vehicles.push(sportsCar);

    // Begin background loading of 3D metropolis (opt Draco first, fallback raw)
    const optModelUrl = '/models/city/LowPoly_City_01Ready_opt.glb';
    const rawModelUrl = '/models/city/LowPoly_City_01Ready.glb';

    fetch(optModelUrl, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          loadCity(optModelUrl);
        } else {
          loadCity(rawModelUrl);
        }
      })
      .catch(() => {
        loadCity(rawModelUrl);
      });

    // Helper: Interpolate along closed loop circuit
    const evalCircuit = (circuit, dist) => {
      let total = 0;
      const lens = [];
      for (let i = 0; i < circuit.length; i++) {
        const pA = circuit[i];
        const pB = circuit[(i + 1) % circuit.length];
        const len = Math.hypot(pB.x - pA.x, pB.z - pA.z);
        lens.push(len);
        total += len;
      }
      let d = ((dist % total) + total) % total;
      for (let i = 0; i < circuit.length; i++) {
        const l = lens[i];
        if (d <= l) {
          const frac = d / l;
          const pA = circuit[i];
          const pB = circuit[(i + 1) % circuit.length];
          const x = pA.x + (pB.x - pA.x) * frac;
          const y = pA.y + (pB.y - pA.y) * frac;
          const z = pA.z + (pB.z - pA.z) * frac;
          const heading = Math.atan2(pB.x - pA.x, pB.z - pA.z) - Math.PI / 2;
          return { x, y, z, heading };
        }
        d -= l;
      }
      return { x: circuit[0].x, y: circuit[0].y, z: circuit[0].z, heading: 0 };
    };

    // Helper: Interpolate bridge crossing
    const evalBridge = (t) => {
      // t goes 0 to 2 (0..1 forward, 1..2 backward)
      const phase = t % 2;
      const forward = phase < 1;
      const frac = forward ? phase : 2 - phase;
      const pStart = bridgeWaypoints[0];
      const pEnd = bridgeWaypoints[bridgeWaypoints.length - 1];

      const x = pStart.x + (pEnd.x - pStart.x) * frac;
      const z = pStart.z + (pEnd.z - pStart.z) * frac;
      const y = 0.40 + Math.sin(frac * Math.PI) * 0.95;

      const heading = forward
        ? Math.atan2(pEnd.x - pStart.x, pEnd.z - pStart.z) - Math.PI / 2
        : Math.atan2(pStart.x - pEnd.x, pStart.z - pEnd.z) - Math.PI / 2;

      return { x, y, z, heading };
    };

    // 12. Mouse Interactive Parallax
    let mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Responsive Resize Handler with view offset maintenance
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      if (width >= 960) {
        camera.setViewOffset(width, height, -width * 0.22, 0, width, height);
      } else {
        camera.clearViewOffset();
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onResize);

    // 13. 60 FPS Render Loop
    let clock = new THREE.Clock();
    let reqId;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Update Skeletal Animations (Handyman walking!)
      mixers.forEach((m) => m.update(delta));

      // Handyman walk patrol along construction site front
      if (handymanModel) {
        const walkCycle = Math.sin(time * 0.7);
        handymanModel.position.x = walkCycle * 2.8;
        handymanModel.position.z = 4.4;
        handymanModel.rotation.y = Math.cos(time * 0.7) >= 0 ? Math.PI / 2 : -Math.PI / 2;
      }

      // Camera Smooth Parallax
      camera.position.x = cameraBase.x + mouse.x * 3.0;
      camera.position.y = cameraBase.y - mouse.y * 2.0;
      camera.lookAt(cameraTarget);

      // Rotating Crane Jib Arm
      jibAssembly.rotation.y = Math.sin(time * 0.5) * 0.65;

      // Trolley Movement along Jib
      trolley.position.x = -4.5 + Math.sin(time * 0.8) * 2.2;

      // Suspended Beam Gentle Sway
      beamGroup.rotation.z = Math.sin(time * 1.5) * 0.08;
      beamGroup.rotation.y = Math.cos(time * 0.6) * 0.15;

      // Welder Arc Flash Flicker
      const weldFlicker = Math.random() > 0.35 ? Math.random() * 2.8 + 1.2 : 0;
      welderLight.intensity = weldFlicker;

      // Crane Strobe Beacon Blink
      beaconLight.intensity = Math.sin(time * 6) > 0.7 ? 2 : 0.1;

      // River Tugboat Gentle Water Rocking
      riverBoat.position.y = 0.18 + Math.sin(time * 1.6) * 0.04;
      riverBoat.rotation.z = Math.sin(time * 1.2) * 0.03;

      // Cars Moving along Real Road Circuits (No Water, No Void!)
      vehicles.forEach((car) => {
        if (car.userData.mode === 'circuit') {
          car.userData.distance += car.userData.speed;
          const pos = evalCircuit(car.userData.circuit, car.userData.distance);
          car.position.set(pos.x, pos.y, pos.z);
          car.rotation.y = pos.heading;
        } else if (car.userData.mode === 'bridge') {
          car.userData.t += car.userData.speed;
          const pos = evalBridge(car.userData.t);
          car.position.set(pos.x, pos.y, pos.z);
          car.rotation.y = pos.heading;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(reqId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="mini-city-universe">
      {/* ============================================================
          PROGRESSIVE 3D ASSET STREAMING INDICATOR (NON-BLOCKING)
         ============================================================ */}
      {!isLoaded && (
        <div className="city-streaming-pill">
          <div className="streaming-spinner-ring"></div>
          <div className="streaming-info">
            <span className="streaming-title">STREAMING FULL-DETAIL 3D</span>
            <div className="streaming-progress-track">
              <div className="streaming-progress-fill" style={{ width: `${Math.max(loadingProgress, 8)}%` }}></div>
            </div>
          </div>
          <span className="streaming-percent">{loadingProgress}%</span>
        </div>
      )}

      {/* ============================================================
          REAL 3D THREE.JS WEBGL METROPOLIS (EDGE-TO-EDGE CANVAS)
          100% Real Interactive WebGL diorama with live 60 FPS diorama!
         ============================================================ */}
      <div className="three-canvas-container" ref={mountRef}></div>

      {/* ============================================================
          FOREGROUND: MODERN GLASSMORPHIC METROPOLIS CONSOLE
          Architectural HUD glassmorphism + razor-sharp typography
         ============================================================ */}
      <div className="hero-atmosphere-zone">
        {/* Architectural HUD Corner Accents */}
        <div className="hud-corner hud-corner-tl"></div>
        <div className="hud-corner hud-corner-tr"></div>
        <div className="hud-corner hud-corner-bl"></div>
        <div className="hud-corner hud-corner-br"></div>

        {/* Live Status Pill with Radar Beacon */}
        <div className="status-pill-3d">
          <span className="beacon-pulse-dot"></span>
          <span className="status-pill-text">UNDER ACTIVE CONSTRUCTION • 24/7 DOWNTOWN SITE</span>
        </div>

        {/* Modern Headline Cluster */}
        <div className="headline-3d-cluster">
          <div className="headline-kicker-row">
            <span className="kicker-crosshair">⌖</span>
            <span className="headline-pre-tag">WE'RE CONSTRUCTING</span>
          </div>
          <h1 className="headline-3d-title">Something Extraordinary</h1>
        </div>

        {/* Crisp, High-Contrast Readable Purpose Text */}
        <p className="hero-crisp-desc">
          Our miniature workforce is building the next-generation digital experience right in the heart of this thriving 3D metropolis. Every beam, component, and pixel is being engineered to perfection.
        </p>

        {/* LUXURY GLASSMORPHIC LIVE CLOCK */}
        <div className="live-clock-3d-module">
          <div className="clock-sub-header">
            <div className="clock-header-left">
              <span className="clock-pulse-indicator"></span>
              <span className="clock-title-badge">LOCAL METROPOLIS TIME</span>
            </div>
            <span className="clock-date-display">• {currentTime.dayStr}, {currentTime.dateStr}</span>
          </div>

          <div className="clock-tiles-row">
            <div className="clock-tile-3d">
              <span className="tile-value">{currentTime.hours}</span>
              <span className="tile-caption">HOURS</span>
            </div>

            <div className="clock-tile-3d">
              <span className="tile-value">{currentTime.minutes}</span>
              <span className="tile-caption">MINUTES</span>
            </div>

            <div className="clock-tile-3d tile-seconds">
              <span className="tile-value">{currentTime.seconds}</span>
              <span className="tile-caption">SECONDS</span>
            </div>

            <div className="clock-tile-3d tile-ampm">
              <div className="ampm-value-wrap">
                <span className="tile-value tile-ampm-val">{currentTime.ampm}</span>
                <span className="ampm-pulse-dot"></span>
              </div>
              <span className="tile-caption">PERIOD</span>
            </div>
          </div>
        </div>

        {/* Sleek High-Tech Early Access Form */}
        <form className="early-access-form-3d" onSubmit={handleSubmit}>
          <div className="form-input-pill">
            <div className="input-icon-slot">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            <input
              type="email"
              placeholder="Enter your email for early access..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="form-btn-3d">
              <span>{subscribed ? '✓ Subscribed!' : 'Get Early Access'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </form>

        {/* High-Precision Construction Telemetry */}
        <div className="milestone-progress-3d">
          <div className="progress-labels-bar">
            <div className="milestone-title-wrap">
              <span className="milestone-telemetry-dot"></span>
              <span className="milestone-title">METROPOLIS PHASE 04: SUPERSTRUCTURE</span>
            </div>
            <span className="milestone-percent">88% COMPLETE</span>
          </div>
          <div className="progress-rail-3d">
            <div className="progress-fill-modern">
              <span className="progress-glow-head"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
