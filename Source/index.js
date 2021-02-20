import Renderer from './renderer.js';
import Shader from './shader.js';
import vertexShaderSrc from './vertex.js';
import fragmentShaderSrc from './fragment.js';
import { vec3, mat4, vec4 } from 'https://cdn.skypack.dev/gl-matrix';
import objLoader from 'https://cdn.skypack.dev/webgl-obj-loader';
import Arrow from './Arrow.js';
import Triangle from './Triangle.js';
import Mesh from './3DMesh.js';
import SuperMesh from './SuperMesh.js';

/* Canvas Setup Begins */
const renderer = new Renderer();
const gl = renderer.webGlContext();

// renderer.clear();

const shader = new Shader(gl, vertexShaderSrc, fragmentShaderSrc);
shader.use();
/* Canvas Setup Ends */


/************************* 
** Projection values **
*************************/  

var proj = {
    fovy: Math.PI/3,
    aspect: window.innerWidth/ window.innerHeight,
    near: 1,
    far: 10000,
}
/************************* 
******* Camera Setup *****
*************************/
var camera = {
    eye: {
        x: 0,
        y: 0,
        z: 1000,
    },
    center: {
        x: 0,
        y: 0,
        z: 0,
    },
    up: {
        x: 0,
        y: 1,
        z: 0,
    },
    radius: 1000,
}

var CameraAngle = Math.PI/1000;
var CameraAxis = vec3.fromValues(0,1,0);
var CameraTransformMatrix = mat4.create();
mat4.identity(CameraTransformMatrix);

/************************* 
** Reading Mesh objects **
*************************/
////////////// ARROW ///////////////////////////////
var ArrowMesh;
var ArrowRead= false;
var ArrowX, ArrowY, ArrowZ;
var rotationAngleX = 0;
var rotationAngleY = Math.PI/2;
var rotationAngleZ = -Math.PI/2;
var rotationArrowX = vec3.create();
vec3.set(rotationArrowX, 1,0,0); 
var rotationArrowY = vec3.create();
vec3.set(rotationArrowY, 0, 1, 0);
var rotationArrowZ = vec3.create();
vec3.set(rotationArrowZ, 0, 0, 1);

var color = {
    'X': new Float32Array([1,0,0,1]),
    'Y': new Float32Array([0,1,0,1]),
    'Z': new Float32Array([0,0,1,1]), 
};

fetch('./models/Arrow.obj')
    .then(response => response.text())
    .then(data => {
        ArrowMesh = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        ArrowRead=true;
        ArrowX = new Arrow(gl, ArrowMesh, rotationAngleX, rotationArrowX, proj, color['X'], camera);
        ArrowY = new Arrow(gl, ArrowMesh, rotationAngleY, rotationArrowZ, proj, color['Y'], camera);
        ArrowZ = new Arrow(gl, ArrowMesh, rotationAngleZ, rotationArrowY, proj, color['Z'], camera);
    })

/////////////////////////////////////////////////////
//////////////// CUBE ///////////////////////////////
var CubeAngle = 0;
var CubeRead=false;
var side1 = false;
var side2 = false;
var side3 = false;
var side4 = false;
var side5 = false;
var side6 = false;
var CubeMesh = new SuperMesh(gl); // Shader Object to be drawn
var CubeAngleX=0;
var CubeRotationAxis= vec3.create();
vec3.set(CubeRotationAxis, 1, 0, 0);
var CubeColor = new Float32Array([0.2, 0.7, 0.6, 1.0]);
var CubeToggle=false;
var CubeSelected = false;

fetch('./models/Cube/Side1.obj')
    .then(response => response.text())
    .then(data => {
        var CubeMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        side1=true;
        CubeMesh.addSubMesh(new Mesh(gl, CubeMeshObject, CubeAngleX, CubeRotationAxis, proj, new Float32Array([0.2, 0.7, 0.6, 1.0]), camera));
        if(side1 && side2 && side3 && side4 && side5 && side6)
        {
            CubeRead = true;
        }
    })
fetch('./models/Cube/Side2.obj')
    .then(response => response.text())
    .then(data => {
        var CubeMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        side2=true;
        CubeMesh.addSubMesh(new Mesh(gl, CubeMeshObject, CubeAngleX, CubeRotationAxis, proj, new Float32Array([0.2, 0.7, 0.615, 1.0]), camera));
        if(side1 && side2 && side3 && side4 && side5 && side6)
        {
            CubeRead = true;
        }
    })
fetch('./models/Cube/Side3.obj')
    .then(response => response.text())
    .then(data => {
        var CubeMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        side3=true;
        CubeMesh.addSubMesh(new Mesh(gl, CubeMeshObject, CubeAngleX, CubeRotationAxis, proj, new Float32Array([0.2, 0.7, 0.62, 1.0]), camera));
        if(side1 && side2 && side3 && side4 && side5 && side6)
        {
            CubeRead = true;
        }
    })
fetch('./models/Cube/Side4.obj')
    .then(response => response.text())
    .then(data => {
        var CubeMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        side4=true;
        CubeMesh.addSubMesh(new Mesh(gl, CubeMeshObject, CubeAngleX, CubeRotationAxis, proj, new Float32Array([0.2, 0.7, 0.63, 1.0]), camera));
        if(side1 && side2 && side3 && side4 && side5 && side6)
        {
            CubeRead = true;
        }
    })

fetch('./models/Cube/Side5.obj')
    .then(response => response.text())
    .then(data => {
        var CubeMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        side5=true;
        CubeMesh.addSubMesh(new Mesh(gl, CubeMeshObject, CubeAngleX, CubeRotationAxis, proj, new Float32Array([0.2, 0.7, 0.64, 1.0]), camera));
        if(side1 && side2 && side3 && side4 && side5 && side6)
        {
            CubeRead = true;
        }
    })
fetch('./models/Cube/Side6.obj')
    .then(response => response.text())
    .then(data => {
        var CubeMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        side6=true;
        CubeMesh.addSubMesh(new Mesh(gl, CubeMeshObject, CubeAngleX, CubeRotationAxis, proj, new Float32Array([0.2, 0.7, 0.65, 1.0]), camera));
        if(side1 && side2 && side3 && side4 && side5 && side6)
        {
            CubeRead = true;
        }
    })

////////////////////////////////////////////////////
//////////////// Random ///////////////////////////////
var RandomAngle = 0;
var RandomRead=false;
var Part1 = false;
var Part2 = false;
var Part3 = false;
var Part4 = false;

var RandomMesh= new SuperMesh(gl); // Shader Object to be drawn
var RandomAngleX=0;
var RandomRotationAxis= vec3.create();
vec3.set(RandomRotationAxis, 1, 0, 0);
var RandomColor = new Float32Array([1.0, 0.2, 0.2, 1.0]);
var RandomToggle=false;
var RandomSelected = false;

fetch('./models/Surprise/RandomPart1.obj')
    .then(response => response.text())
    .then(data => {
        var RandomMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        Part1 = true;
        RandomMesh.addSubMesh(new Mesh(gl, RandomMeshObject, RandomAngleX, RandomRotationAxis, proj, new Float32Array([1.0, 0.2, 0.2, 1.0]), camera));
        if(Part1 && Part2 && Part3 && Part4)
        {
            RandomRead = true;
        }
    })

fetch('./models/Surprise/RandomPart2.obj')
    .then(response => response.text())
    .then(data => {
        var RandomMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        Part2 = true;
        RandomMesh.addSubMesh(new Mesh(gl, RandomMeshObject, RandomAngleX, RandomRotationAxis, proj, new Float32Array([1.0, 0.2, 0.21, 1.0]), camera));
        if(Part1 && Part2 && Part3 && Part4)
        {
            RandomRead = true;
        }
    })

fetch('./models/Surprise/RandomPart3.obj')
    .then(response => response.text())
    .then(data => {
        var RandomMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        Part3 = true;
        RandomMesh.addSubMesh(new Mesh(gl, RandomMeshObject, RandomAngleX, RandomRotationAxis, proj, new Float32Array([1.0, 0.2, 0.22, 1.0]), camera));
        if(Part1 && Part2 && Part3 && Part4)
        {
            RandomRead = true;
        }
    })

fetch('./models/Surprise/RandomPart4.obj')
    .then(response => response.text())
    .then(data => {
        var RandomMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        Part4 = true;
        RandomMesh.addSubMesh(new Mesh(gl, RandomMeshObject, RandomAngleX, RandomRotationAxis, proj, new Float32Array([1.0, 0.2, 0.23, 1.0]), camera));
        if(Part1 && Part2 && Part3 && Part4)
        {
            RandomRead = true;
        }
    })
////////////////////////////////////////////////////
//////////////// Torus ///////////////////////////////
var TorusAngle=0;
var TorusRead=false;
var Quater1 = false;
var Quater2 = false;
var Quater3 = false;
var Quater4 = false;

var TorusMesh = new SuperMesh(gl); // Shader Object to be drawn
var TorusAngleX=0;
var TorusRotationAxis= vec3.create();
vec3.set(TorusRotationAxis, 1, 0, 0);
var TorusColor = new Float32Array([0.199, 0.499, 0.6, 1.0]);
var TorusToggle=false;
var TorusSelected = false;

fetch('./models/Torus/TQuater1.obj')
    .then(response => response.text())
    .then(data => {
        var TorusMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        Quater1 = true;
        TorusMesh.addSubMesh(new Mesh(gl, TorusMeshObject, TorusAngleX, TorusRotationAxis, proj, new Float32Array([0.199, 0.499, 0.6, 1.0]), camera));
        if(Quater1 && Quater2 && Quater3 && Quater4)
        {
            TorusRead = true;
        }
    })

fetch('./models/Torus/TQuater2.obj')
    .then(response => response.text())
    .then(data => {
        var TorusMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        Quater2 = true;
        TorusMesh.addSubMesh(new Mesh(gl, TorusMeshObject, TorusAngleX, TorusRotationAxis, proj, new Float32Array([0.199, 0.499, 0.61, 1.0]), camera));
        if(Quater1 && Quater2 && Quater3 && Quater4)
        {
            TorusRead = true;
        }
    })

fetch('./models/Torus/TQuater3.obj')
    .then(response => response.text())
    .then(data => {
        var TorusMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        Quater3 = true;
        TorusMesh.addSubMesh(new Mesh(gl, TorusMeshObject, TorusAngleX, TorusRotationAxis, proj, new Float32Array([0.199, 0.499, 0.62, 1.0]), camera));
        if(Quater1 && Quater2 && Quater3 && Quater4)
        {
            TorusRead = true;
        }
    })

fetch('./models/Torus/TQuater4.obj')
    .then(response => response.text())
    .then(data => {
        var TorusMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        Quater4 = true;
        TorusMesh.addSubMesh(new Mesh(gl, TorusMeshObject, TorusAngleX, TorusRotationAxis, proj, new Float32Array([0.199, 0.499, 0.63, 1.0]), camera));
        if(Quater1 && Quater2 && Quater3 && Quater4)
        {
            TorusRead = true;
        }
    })
//////////////////////////////////////////////////////
//////////////// Triangle ///////////////////////////////
var CentreTriangleToggle=false;
var CentreTriangle = new Triangle(gl, 40, new Float32Array([0.5, 0.3, 0.4,0.5]), proj, camera);
var Corners = CentreTriangle.getCorners();
var pointA = vec3.fromValues(Corners[0],Corners[1],Corners[2]);
var pointB = vec3.fromValues(Corners[4],Corners[5],Corners[6]);
var pointC = vec3.fromValues(Corners[8],Corners[9],Corners[10]);

/////////////////////////////////////////////////////

// Variables Relevant to all Modes
let mode_value = 0; 
let terminate = false;
let MouseCoordinates = 0;
var SelectMode=false;
var CameraMouseDragY = false;
var MouseDownX, MouseDownY;
var SetReset = false;
/////////////////////////////////////////////////////
window.onload = () => 
{
    renderer.getCanvas().addEventListener('click', (event) =>
    {
        animate();
        let pointerX = event.clientX;
        let pointerY = event.clientY;

        let render_area = renderer.getCanvas().getBoundingClientRect();
        pointerX = pointerX - render_area.left;
        pointerY = render_area.bottom - pointerY;

        var pixels = new Uint8Array(4);
        gl.readPixels(pointerX, pointerY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        if(SelectMode == true && mode_value==7)
        {
            // Face Selection
            var FaceCube = CubeMesh.isFaceSelected(pixels);
            var FaceRandom = RandomMesh.isFaceSelected(pixels);
            var FaceTorus = TorusMesh.isFaceSelected(pixels);
            if(FaceCube == 1)
            {
                RandomMesh.resetSelected();
                TorusMesh.resetSelected();
            }
            else if(FaceRandom == 1)
            {
                CubeMesh.resetSelected();
                TorusMesh.resetSelected();
            }
            else if(FaceTorus == 1)
            {
                CubeMesh.resetSelected();
                RandomMesh.resetSelected();
            }
            else
            {
                CubeMesh.resetSelected();
                RandomMesh.resetSelected();
                TorusMesh.resetSelected();
            }
        }
        else if(SelectMode == false && mode_value==7)
        {
            // Object Selection

            if(pixels[0] == Math.round(CubeColor[0]*255) && pixels[1] == Math.round(CubeColor[1]*255) &&
                pixels[2] >= Math.round(CubeColor[2]*255) && pixels[2] <= Math.round((CubeColor[2]+0.05)*255) && pixels[3] == Math.round(CubeColor[3]*255))
                {
                    CubeSelected = true;
                    RandomSelected = false;
                    TorusSelected = false;
                }
            else if(pixels[0] == Math.round(RandomColor[0]*255) && pixels[1] == Math.round(RandomColor[1]*255) &&
                pixels[2] >= Math.round(RandomColor[2]*255) && pixels[2] <= Math.round((RandomColor[2]+0.03)*255) && pixels[3] == Math.round(RandomColor[3]*255))
                {
                    CubeSelected = false;
                    RandomSelected = true;
                    TorusSelected = false;
                }
            else if(pixels[0] == Math.round(TorusColor[0]*255) && pixels[1] == Math.round(TorusColor[1]*255) &&
            pixels[2] >= Math.round(TorusColor[2]*255) && pixels[2] <= Math.round((TorusColor[2]+0.03)*255) && pixels[3] == Math.round(TorusColor[3]*255))
                {
                    CubeSelected = false;
                    RandomSelected = false;
                    TorusSelected = true;
                }
            else
            {
                CubeSelected = false;
                RandomSelected = false;
                TorusSelected = false;
            }
        }
    });

    renderer.getCanvas().addEventListener("mousedown", (event) => {
        if(mode_value == 6)
        {
            let mouseX = event.clientX;
            let mouseY = event.clientY;

            let render_area = renderer.getCanvas().getBoundingClientRect();
            mouseX = mouseX - render_area.left;
            mouseY = mouseY - render_area.top;

            MouseCoordinates = renderer.mouseToClipCoord(mouseX, mouseY);
            
            [MouseDownX, MouseDownY] = MouseCoordinates;
            CameraMouseDragY = true;
        }
    });
    renderer.getCanvas().addEventListener("mouseup", (event) => {
        CameraMouseDragY = false;
    });
 
    document.addEventListener("mousemove" , (ev)=> {
        let mouseX = ev.clientX;
        let mouseY = ev.clientY;

        let render_area = renderer.getCanvas().getBoundingClientRect();
        mouseX = mouseX - render_area.left;
        mouseY = mouseY - render_area.top;

        MouseCoordinates = renderer.mouseToClipCoord(mouseX, mouseY);
        if(CameraMouseDragY == true && mode_value == 6)
        {
            var moveX = MouseCoordinates[0] - MouseDownX;
            var radius = 100;
            if(moveX >= 0) //Moved in positive X direction
            {
                // radius*theta = moveX
                CameraAngle = moveX/radius;
                var tempCamera = camera;
                tempCamera.eye.x = camera.radius * Math.sin(CameraAngle);
                tempCamera.eye.y = camera.eye.y;
                tempCamera.eye.z = camera.radius * Math.cos(CameraAngle);

                ArrowY.updateCamera(tempCamera);
                ArrowX.updateCamera(tempCamera);
                ArrowZ.updateCamera(tempCamera);
                CubeMesh.updateCamera(tempCamera);
                RandomMesh.updateCamera(tempCamera);
                TorusMesh.updateCamera(tempCamera);
                CentreTriangle.updateCamera(tempCamera);
            }
            else
            {
                CameraAngle = moveX/radius;
                var tempCamera = camera;
                tempCamera.eye.x = camera.radius * Math.sin(CameraAngle);
                tempCamera.eye.y = camera.eye.y;
                tempCamera.eye.z = camera.radius * Math.cos(CameraAngle);

                ArrowY.updateCamera(tempCamera);
                ArrowX.updateCamera(tempCamera);
                ArrowZ.updateCamera(tempCamera);
                CubeMesh.updateCamera(tempCamera);
                RandomMesh.updateCamera(tempCamera);
                TorusMesh.updateCamera(tempCamera);
                CentreTriangle.updateCamera(tempCamera);
            }
        }
    });


    document.addEventListener("keydown", (ev) => {

        if(ev.key == "ArrowLeft" && mode_value == 6)
        {
            CameraAngle += Math.PI/100;
            var tempCamera = camera;
            tempCamera.eye.x = camera.radius * Math.sin(CameraAngle);
            tempCamera.eye.y = camera.eye.y;
            tempCamera.eye.z = camera.radius * Math.cos(CameraAngle);

            ArrowY.updateCamera(tempCamera);
            ArrowX.updateCamera(tempCamera);
            ArrowZ.updateCamera(tempCamera);
            CubeMesh.updateCamera(tempCamera);
            RandomMesh.updateCamera(tempCamera);
            TorusMesh.updateCamera(tempCamera);
            CentreTriangle.updateCamera(tempCamera);
        }
        
        else if(ev.key == "ArrowRight" && mode_value == 6)
        {
            CameraAngle -= Math.PI/100;
            var tempCamera = camera;
            tempCamera.eye.x = camera.radius * Math.sin(CameraAngle);
            tempCamera.eye.y = camera.eye.y;
            tempCamera.eye.z = camera.radius * Math.cos(CameraAngle);

            ArrowY.updateCamera(tempCamera);
            ArrowX.updateCamera(tempCamera);
            ArrowZ.updateCamera(tempCamera);
            CubeMesh.updateCamera(tempCamera);
            RandomMesh.updateCamera(tempCamera);
            TorusMesh.updateCamera(tempCamera);
            CentreTriangle.updateCamera(tempCamera);
        }

        else if(ev.key == "r" && mode_value == 5)
        {
            CentreTriangleToggle=true;

            // Place Cube at the center of side AB of the triangle
            CubeToggle = true;
            CubeMesh.setRotate(vec3.fromValues(0,1,0), CubeAngle += Math.PI/2);
            CubeMesh.updateMVPMatrix();
            // Place Random at the center of side BC of triangle
            RandomToggle = true;
            RandomMesh.setRotate(vec3.fromValues(0,0,1), RandomAngle += Math.PI/2);
            RandomMesh.updateMVPMatrix();
            // Place Torus at the center of side CA of triangle
            TorusToggle = true;
            TorusMesh.setRotate(vec3.fromValues(1,0,0), TorusAngle += Math.PI/2);
            TorusMesh.updateMVPMatrix();        
        }

        else if(ev.key == 'Escape')
        {
            terminate = true;
        }
    });


};


//////////////////////////////////////////////////////
////// Setting up the modes using on change value ///

document.getElementById("checkbox").onchange = () => {
    CubeSelected = false;
    RandomSelected = false;
    TorusSelected = false;
    CubeMesh.resetSelected();
    RandomMesh.resetSelected();
    TorusMesh.resetSelected();

    SelectMode = document.getElementById("checkbox").checked;
};

document.getElementById("Mode").onchange = function () {
    if(mode_value != 7)
    {
            CubeSelected = false;
            RandomSelected = false;
            TorusSelected = false;
            CubeMesh.resetSelected();
            RandomMesh.resetSelected();
            TorusMesh.resetSelected();
    }

    if(SetReset==true && mode_value != 4)
    {
        var resetNode = document.getElementById("reset");
        resetNode.textContent = "Reset";
    }
    if(this.value == "Axes")
    {
        mode_value = 1;
        ArrowX.transform.setTranslate(vec3.fromValues(0, 0, 0));
        ArrowX.transform.updateMVPMatrix();
        ArrowY.transform.setTranslate(vec3.fromValues(0, 0, 0));
        ArrowY.transform.updateMVPMatrix();
        ArrowZ.transform.setTranslate(vec3.fromValues(0, 0, 0));
        ArrowZ.transform.updateMVPMatrix();
        CentreTriangleToggle=false;
        CubeToggle = false;
        RandomToggle = false;
        TorusToggle = false;

        SelectMode=false;

        CubeSelected = false;
        RandomSelected = false;
        TorusSelected = false;
        CubeMesh.resetSelected();
        RandomMesh.resetSelected();
        TorusMesh.resetSelected();
    }
    else if( this.value == "Triangle Corner")
    {
        ArrowX.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
        ArrowX.transform.updateMVPMatrix();
        ArrowY.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
        ArrowY.transform.updateMVPMatrix();
        ArrowZ.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
        ArrowZ.transform.updateMVPMatrix();
        mode_value = 2;
        CentreTriangleToggle=true;

        // Place Cube at the top of the triangle
        CubeToggle = true;
        CubeMesh.setTranslate(pointA);
        CubeMesh.updateMVPMatrix();
        // Place Random at the bottom left of triangle
        RandomToggle = true;
        RandomMesh.setTranslate(pointB);
        RandomMesh.updateMVPMatrix();
        // Place Torus at the bottom right of triangle
        TorusToggle = true;
        TorusMesh.setTranslate(pointC);
        TorusMesh.updateMVPMatrix();

        SelectMode=false;

        CubeSelected = false;
        RandomSelected = false;
        TorusSelected = false;
        CubeMesh.resetSelected();
        RandomMesh.resetSelected();
        TorusMesh.resetSelected();
    }
    else if(this.value == "Triangle Side")
    {
        ArrowX.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
        ArrowX.transform.updateMVPMatrix();
        ArrowY.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
        ArrowY.transform.updateMVPMatrix();
        ArrowZ.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
        ArrowZ.transform.updateMVPMatrix();
        mode_value = 3;
        CentreTriangleToggle=true;

        var midAB = vec3.fromValues((pointA[0]+pointB[0])/2, (pointA[1]+pointB[1])/2, (pointA[2]+pointB[2])/2);
        var midBC = vec3.fromValues((pointB[0]+pointC[0])/2, (pointB[1]+pointC[1])/2, (pointB[2]+pointC[2])/2);
        var midCA = vec3.fromValues((pointC[0]+pointA[0])/2, (pointC[1]+pointA[1])/2, (pointC[2]+pointA[2])/2);

        // Place Cube at the center of side AB of the triangle
        CubeToggle = true;
        CubeMesh.setTranslate(midAB);
        CubeMesh.updateMVPMatrix();
        // Place Random at the center of side BC of triangle
        RandomToggle = true;
        RandomMesh.setTranslate(midBC);
        RandomMesh.updateMVPMatrix();
        // Place Torus at the center of side CA of triangle
        TorusToggle = true;
        TorusMesh.setTranslate(midCA);
        TorusMesh.updateMVPMatrix();

        SelectMode=false;

        CubeSelected = false;
        RandomSelected = false;
        TorusSelected = false;
        CubeMesh.resetSelected();
        RandomMesh.resetSelected();
        TorusMesh.resetSelected();
    }
    else if(this.value == "Scale")
    {
        ArrowX.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
        ArrowX.transform.updateMVPMatrix();
        ArrowY.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
        ArrowY.transform.updateMVPMatrix();
        ArrowZ.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
        ArrowZ.transform.updateMVPMatrix();

        mode_value = 4;
        CentreTriangleToggle=true;

        CubeToggle = true;
        var CubeScale = CubeMesh.getScale();
        CubeMesh.setScale([CubeScale[0]*0.5, CubeScale[0]*0.5, CubeScale[0]*0.5]);
        CubeMesh.updateMVPMatrix();
        RandomToggle = true;
        var RandomScale = RandomMesh.getScale();
        RandomMesh.setScale([RandomScale[0]*2,RandomScale[0]*2,RandomScale[0]*2]);
        RandomMesh.updateMVPMatrix();
        TorusToggle = true;
        var TorusScale = TorusMesh.getScale();
        TorusMesh.setScale([TorusScale[0]*3,TorusScale[0]*3,TorusScale[0]*3]);
        TorusMesh.updateMVPMatrix();

        SelectMode=false;

        CubeSelected = false;
        RandomSelected = false;
        TorusSelected = false;
        CubeMesh.resetSelected();
        RandomMesh.resetSelected();
        TorusMesh.resetSelected();

        SetReset = false;
    }
    else if(this.value == "Object Rotate")
    {
        ArrowX.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
        ArrowX.transform.updateMVPMatrix();
        ArrowY.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
        ArrowY.transform.updateMVPMatrix();
        ArrowZ.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
        ArrowZ.transform.updateMVPMatrix();

        mode_value = 5;
        CentreTriangleToggle=true;

        CubeToggle = true;
        CubeMesh.setRotate(vec3.fromValues(0,1,0), CubeAngle += Math.PI/2);
        CubeMesh.updateMVPMatrix();
        RandomToggle = true;
        RandomMesh.setRotate(vec3.fromValues(0,0,1), RandomAngle += Math.PI/2);
        RandomMesh.updateMVPMatrix();
        TorusToggle = true;
        TorusMesh.setRotate(vec3.fromValues(1,0,0), TorusAngle += Math.PI/2);
        TorusMesh.updateMVPMatrix();

        SelectMode=false;

        CubeSelected = false;
        RandomSelected = false;
        TorusSelected = false;
        CubeMesh.resetSelected();
        RandomMesh.resetSelected();
        TorusMesh.resetSelected();
    }
    else if(this.value == "Camera Rotate")
    {
        mode_value = 6;

        SelectMode=false;

        CubeSelected = false;
        RandomSelected = false;
        TorusSelected = false;
        CubeMesh.resetSelected();
        RandomMesh.resetSelected();
        TorusMesh.resetSelected();
    }
    else
    {
        mode_value = 7;
    }

};

document.getElementById("reset").onclick = function()
{
    if(mode_value == 4 && SetReset == false)
    {
        CentreTriangleToggle=true;

        CubeToggle = true;
        var CubeScale = CubeMesh.getScale();
        CubeMesh.setScale([CubeScale[0]*1, CubeScale[0]*1, CubeScale[0]*1]);
        CubeMesh.updateMVPMatrix();
        RandomToggle = true;
        var RandomScale = RandomMesh.getScale();
        RandomMesh.setScale([RandomScale[0]*1,RandomScale[0]*1,RandomScale[0]*1]);
        RandomMesh.updateMVPMatrix();
        TorusToggle = true;
        var TorusScale = TorusMesh.getScale();
        TorusMesh.setScale([TorusScale[0]*1,TorusScale[0]*1,TorusScale[0]*1]);
        TorusMesh.updateMVPMatrix();

        SelectMode=false;

        CubeSelected = false;
        RandomSelected = false;
        TorusSelected = false;
        CubeMesh.resetSelected();
        RandomMesh.resetSelected();
        TorusMesh.resetSelected();
        SetReset=true;

        var resetNode = document.getElementById("reset");
        resetNode.textContent = "Scale";
    }

    else if(mode_value == 4 && SetReset==true)
    {
        CentreTriangleToggle=true;

        CubeToggle = true;
        var CubeScale = CubeMesh.getScale();
        CubeMesh.setScale([CubeScale[0]*0.5, CubeScale[0]*0.5, CubeScale[0]*0.5]);
        CubeMesh.updateMVPMatrix();
        RandomToggle = true;
        var RandomScale = RandomMesh.getScale();
        RandomMesh.setScale([RandomScale[0]*2,RandomScale[0]*2,RandomScale[0]*2]);
        RandomMesh.updateMVPMatrix();
        TorusToggle = true;
        var TorusScale = TorusMesh.getScale();
        TorusMesh.setScale([TorusScale[0]*3,TorusScale[0]*3,TorusScale[0]*3]);
        TorusMesh.updateMVPMatrix();

        SelectMode=false;

        CubeSelected = false;
        RandomSelected = false;
        TorusSelected = false;
        CubeMesh.resetSelected();
        RandomMesh.resetSelected();
        TorusMesh.resetSelected();
        SetReset=false;

        var resetNode = document.getElementById("reset");
        resetNode.textContent = "Reset";
    }
};
////////////////////////////////////////////////////

// Mouse Coordinates in Canvas system
var mouseXElement = document.querySelector('#mousex');
var mouseX = document.createTextNode("");
mouseXElement.appendChild(mouseX);

var mouseYElement = document.querySelector('#mousey');
var mouseY = document.createTextNode("");
mouseYElement.appendChild(mouseY);


function animate()
{
    renderer.clear();
    // Text Box dynamic Handler
    if(typeof MouseCoordinates[0] != 'undefined')
    {
        mouseX.nodeValue = MouseCoordinates[0].toPrecision(4);
        mouseY.nodeValue = MouseCoordinates[1].toPrecision(4);
    }

    if(ArrowRead == true)
    {
        ArrowX.draw(shader);
        ArrowY.draw(shader);
        ArrowZ.draw(shader);
    }

    if(CentreTriangleToggle == true)
    {
        CentreTriangle.draw(shader);
    }

    if(SelectMode == false)
    {
        if(CubeToggle == true && CubeRead == true)
        {
            CubeMesh.draw(shader, CubeSelected);
        }
        if(RandomToggle == true)
        {
            RandomMesh.draw(shader, RandomSelected);
        }
        if(TorusToggle == true)
        {
            TorusMesh.draw(shader, TorusSelected);
        }
    }
    else
    {
        if(CubeToggle == true && CubeRead == true)
        {
            CubeMesh.draw(shader, CubeSelected);
        }
        if(RandomToggle == true && RandomRead == true)
        {
            RandomMesh.draw(shader, RandomSelected);
        }
        if(TorusToggle == true && RandomRead == true)
        {
            TorusMesh.draw(shader, TorusSelected);
        }
    }
    if(mode_value == 7)
    {
        document.getElementsByClassName("toggle-button-cover")[0].style.display = "block";
    }
    else
    {
        document.getElementsByClassName("toggle-button-cover")[0].style.display = "none";
    }
    if(mode_value == 4)
    {
        document.getElementsByClassName("resetButton")[0].style.display = "block";
    }
    else
    {
        document.getElementsByClassName("resetButton")[0].style.display = "none";
    }

    // Activated by pressing 'Escape' key
    if(terminate == false)
        window.requestAnimationFrame(animate);
    else
        window.cancelAnimationFrame(animate);
}

animate();
shader.cleanup();

// Key Presses link = https://keycode.info/