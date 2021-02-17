import Renderer from './renderer.js';
import Shader from './shader.js';
import vertexShaderSrc from './vertex.js';
import fragmentShaderSrc from './fragment.js';
import { vec3, mat4, vec4 } from 'https://cdn.skypack.dev/gl-matrix';
import objLoader from 'https://cdn.skypack.dev/webgl-obj-loader';
import Arrow from './Arrow.js';
import Triangle from './Triangle.js';
import Mesh from './3DMesh.js';

/* Canvas Setup Begins */
const renderer = new Renderer();
const gl = renderer.webGlContext();

renderer.clear();

const shader = new Shader(gl, vertexShaderSrc, fragmentShaderSrc);
shader.use();
/* Canvas Setup Ends */


/************************* 
** Projection values **
*************************/
// var proj = {
//     'left' : -window.innerWidth/2,
//     'right' : window.innerWidth/2,
//     'top' : window.innerHeight/2,
//     'bottom' : -window.innerHeight/2,
//     'near' : -10000,
//     'far' : 10000,
// }   

var proj = {
    fovy: Math.PI/3,
    aspect: window.innerWidth/ window.innerHeight,
    near: 0,
    far: 1000,
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
var rotationAngleZ = Math.PI/2;
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
var CubeMeshObject; // Text file content
var CubeMesh; // Shader Object to be drawn
var CubeAngleX=0;
var CubeRotationAxis= vec3.create();
vec3.set(CubeRotationAxis, 1, 0, 0);
var CubeColor = new Float32Array([0.2, 0.7, 0.6, 1.0]);
var CubeToggle=false;
var CubeSelected = false;

fetch('./models/Cube.obj')
    .then(response => response.text())
    .then(data => {
        CubeMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        CubeRead=true;
        console.log(CubeMeshObject);
        debugger;
        CubeMesh = new Mesh(gl, CubeMeshObject, CubeAngleX, CubeRotationAxis, proj, CubeColor, camera);
    })

////////////////////////////////////////////////////
//////////////// Icosphere ///////////////////////////////
var IcosphereAngle = 0;
var IcosphereRead=false;
var IcosphereMeshObject; // Text file content
var IcosphereMesh; // Shader Object to be drawn
var IcosphereAngleX=0;
var IcosphereRotationAxis= vec3.create();
vec3.set(IcosphereRotationAxis, 1, 0, 0);
var IcosphereColor = new Float32Array([1.0, 0.2, 0.2, 1.0]);
var IcosphereToggle=false;
var IcosphereSelected = false;

fetch('./models/Icosphere.obj')
    .then(response => response.text())
    .then(data => {
        IcosphereMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        IcosphereRead=true;
        IcosphereMesh = new Mesh(gl, IcosphereMeshObject, IcosphereAngleX, IcosphereRotationAxis, proj, IcosphereColor, camera);
    })

////////////////////////////////////////////////////
//////////////// Torus ///////////////////////////////
var TorusAngle=0;
var TorusMeshObject; // Text file content
var TorusRead=false;
var TorusMesh; // Shader Object to be drawn
var TorusAngleX=0;
var TorusRotationAxis= vec3.create();
vec3.set(TorusRotationAxis, 1, 0, 0);
var TorusColor = new Float32Array([0.199, 0.499, 0.6, 1.0]);
var TorusToggle=false;
var TorusSelected = false;

fetch('./models/Torus.obj')
    .then(response => response.text())
    .then(data => {
        TorusMeshObject = JSON.parse(JSON.stringify(new objLoader.Mesh(data)));
        TorusRead=true;
        TorusMesh = new Mesh(gl, TorusMeshObject, TorusAngleX, TorusRotationAxis, proj, TorusColor, camera);
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
// D 1 -> Place objects at the triangle's corner
// E 2 -> Place at triangle's edge center
// F 3 -> Rotate objects about different axis for each model
// G 4 -> Scale by 0.5, 2, 3
// H 5 -> Pick Objects

let terminate = false;
let MouseCoordinates = 0;
var SelectMode=false;
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

        if(SelectMode == true && mode_value==5)
        {
            // Face Selection
        }
        else if(SelectMode == false && mode_value==5)
        {
            // Object Selection
            var pixels = new Uint8Array(4);
            gl.readPixels(pointerX, pointerY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

            if(pixels[0] == Math.round(CubeColor[0]*255) && pixels[1] == Math.round(CubeColor[1]*255) &&
                pixels[2] == Math.round(CubeColor[2]*255) && pixels[3] == Math.round(CubeColor[3]*255))
                {
                    CubeSelected = true;
                    IcosphereSelected = false;
                    TorusSelected = false;
                }
            else if(pixels[0] == Math.round(IcosphereColor[0]*255) && pixels[1] == Math.round(IcosphereColor[1]*255) &&
                pixels[2] == Math.round(IcosphereColor[2]*255) && pixels[3] == Math.round(IcosphereColor[3]*255))
                {
                    CubeSelected = false;
                    IcosphereSelected = true;
                    TorusSelected = false;
                }
            else if(pixels[0] == Math.round(TorusColor[0]*255) && pixels[1] == Math.round(TorusColor[1]*255) &&
                pixels[2] == Math.round(TorusColor[2]*255) && pixels[3] == Math.round(TorusColor[3]*255))
                {
                    CubeSelected = false;
                    IcosphereSelected = false;
                    TorusSelected = true;
                }
            else
            {
                CubeSelected = false;
                IcosphereSelected = false;
                TorusSelected = false;
            }
        }
    });

    document.addEventListener("keydown", (ev) => {
        if(mode_value != 5)
        {
            CubeSelected = false;
            IcosphereSelected = false;
            TorusSelected = false;
        }
        if(ev.key == "d")
        {
            ArrowX.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
            ArrowX.transform.updateMVPMatrix();
            ArrowY.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
            ArrowY.transform.updateMVPMatrix();
            ArrowZ.transform.setTranslate(vec3.fromValues(window.innerWidth/2 - window.innerWidth/10, window.innerHeight/2 - window.innerHeight/10, 0));
            ArrowZ.transform.updateMVPMatrix();
            mode_value = 1;
            CentreTriangleToggle=true;

            // Place Cube at the top of the triangle
            CubeToggle = true;
            CubeMesh.transform.setTranslate(pointA);
            CubeMesh.transform.updateMVPMatrix();
            // Place Icospehere at the bottom left of triangle
            IcosphereToggle = true;
            IcosphereMesh.transform.setTranslate(pointB);
            IcosphereMesh.transform.updateMVPMatrix();
            // Place Torus at the bottom right of triangle
            TorusToggle = true;
            TorusMesh.transform.setTranslate(pointC);
            TorusMesh.transform.updateMVPMatrix();
        }
        else if(ev.key == "e")
        {
            console.log("e");
            mode_value = 2;
            CentreTriangleToggle=true;

            var midAB = vec3.fromValues((pointA[0]+pointB[0])/2, (pointA[1]+pointB[1])/2, (pointA[2]+pointB[2])/2);
            var midBC = vec3.fromValues((pointB[0]+pointC[0])/2, (pointB[1]+pointC[1])/2, (pointB[2]+pointC[2])/2);
            var midCA = vec3.fromValues((pointC[0]+pointA[0])/2, (pointC[1]+pointA[1])/2, (pointC[2]+pointA[2])/2);

            // Place Cube at the center of side AB of the triangle
            CubeToggle = true;
            CubeMesh.transform.setTranslate(midAB);
            CubeMesh.transform.updateMVPMatrix();
            // Place Icospehere at the center of side BC of triangle
            IcosphereToggle = true;
            IcosphereMesh.transform.setTranslate(midBC);
            IcosphereMesh.transform.updateMVPMatrix();
            // Place Torus at the center of side CA of triangle
            TorusToggle = true;
            TorusMesh.transform.setTranslate(midCA);
            TorusMesh.transform.updateMVPMatrix();
        }

        else if(ev.key == "f")
        {
            console.log("f");
            mode_value = 3;
            CentreTriangleToggle=true;

            // Place Cube at the center of side AB of the triangle
            CubeToggle = true;
            CubeMesh.transform.setRotate(vec3.fromValues(0,1,0), CubeAngle += Math.PI/2);
            CubeMesh.transform.updateMVPMatrix();
            // Place Icospehere at the center of side BC of triangle
            IcosphereToggle = true;
            IcosphereMesh.transform.setRotate(vec3.fromValues(0,0,1), IcosphereAngle += Math.PI/2);
            IcosphereMesh.transform.updateMVPMatrix();
            // Place Torus at the center of side CA of triangle
            TorusToggle = true;
            TorusMesh.transform.setRotate(vec3.fromValues(1,0,0), TorusAngle += Math.PI/2);
            TorusMesh.transform.updateMVPMatrix();
        }

        else if(ev.key == "g")
        {
            console.log("g");
            mode_value = 4;
            CentreTriangleToggle=true;

            // Place Cube at the center of side AB of the triangle
            CubeToggle = true;
            var CubeScale = CubeMesh.getScale();
            CubeMesh.transform.setScale([CubeScale[0]*0.5, CubeScale[0]*0.5, CubeScale[0]*0.5]);
            CubeMesh.transform.updateMVPMatrix();
            // Place Icospehere at the center of side BC of triangle
            IcosphereToggle = true;
            var IcosphereScale = IcosphereMesh.getScale();
            IcosphereMesh.transform.setScale([IcosphereScale[0]*2,IcosphereScale[0]*2,IcosphereScale[0]*2]);
            IcosphereMesh.transform.updateMVPMatrix();
            // Place Torus at the center of side CA of triangle
            TorusToggle = true;
            var TorusScale = TorusMesh.getScale();
            TorusMesh.transform.setScale([TorusScale[0]*3,TorusScale[0]*3,TorusScale[0]*3]);
            TorusMesh.transform.updateMVPMatrix();
        }

        else if(ev.key == "h")
        {
            mode_value = 5;
        }

        else if(ev.key == "i")
        {
            mode_value = 6;
            //Rotate Mode

        }

        else if(ev.key == "r" && mode_value == 6)
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
            IcosphereMesh.updateCamera(tempCamera);
            TorusMesh.updateCamera(tempCamera);
            CentreTriangle.updateCamera(tempCamera);
        }
        
        else if(ev.shiftKey && ev.key == "R" && mode_value == 6)
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
            IcosphereMesh.updateCamera(tempCamera);
            TorusMesh.updateCamera(tempCamera);
            CentreTriangle.updateCamera(tempCamera);
        }

        else if(ev.key == 'Escape')
        {
            terminate = true;
        }
    });

    // Extra for checking continuous coordinates of the mouse
    document.addEventListener("mousemove" , (ev)=> {
        SelectMode = document.getElementById("checkbox").checked;
        let mouseX = ev.clientX;
        let mouseY = ev.clientY;

        let render_area = renderer.getCanvas().getBoundingClientRect();
        mouseX = mouseX - render_area.left;
        mouseY = mouseY - render_area.top;

        MouseCoordinates = renderer.mouseToClipCoord(mouseX, mouseY);
    });
};

// Shows Mode number
var modeElement = document.querySelector('#mode');
var modeNode = document.createTextNode("");
modeElement.appendChild(modeNode);

// Mouse Coordinates in Canvas system
var mouseXElement = document.querySelector('#mousex');
var mouseX = document.createTextNode("");
mouseXElement.appendChild(mouseX);

var mouseYElement = document.querySelector('#mousey');
var mouseY = document.createTextNode("");
mouseYElement.appendChild(mouseY);

//////////////////////////////////////////////////////
////// Setting up the modes using on change value ///

function animate()
{
    renderer.clear();
    // Text Box dynamic Handler
    modeNode.nodeValue = mode_value;
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
    if(CubeToggle == true)
    {
        CubeMesh.draw(shader, CubeSelected);
    }
    if(IcosphereToggle == true)
    {
        IcosphereMesh.draw(shader, IcosphereSelected);
    }
    if(TorusToggle == true)
    {
        TorusMesh.draw(shader, TorusSelected);
    }
    if(mode_value == 5)
    {
        document.getElementsByClassName("toggle-button-cover")[0].style.display = "block";
    }
    else
    {
        document.getElementsByClassName("toggle-button-cover")[0].style.display = "none";
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