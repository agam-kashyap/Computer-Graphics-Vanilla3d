import Transform from './transform.js'
import { vec3, mat4, vec4 } from 'https://cdn.skypack.dev/gl-matrix';

export default class Mesh 
{
    constructor(gl, MeshOBJect, rotationAngle, rotationAxis, proj, color, camera)
    {
        this.vertexAttributesData = new Float32Array(MeshOBJect.vertices);
        this.vertexIndices = new Uint16Array(MeshOBJect.indices);

        
        this.color =  color;
        this.gl = gl;

        this.vertexAttributesBuffer = this.gl.createBuffer();

        if(!this.vertexAttributesBuffer)
        {
            throw new Error("Buffer for Mesh's vertices could Not be allocated");
        }	

        this.transform = new Transform();
        this.transform.setTranslate(vec3.fromValues(0, 0, 0));
        this.transform.updateMVPMatrix();

        this.translation = vec3.create();
        this.rotationAngle = rotationAngle;
        this.rotationAxis = rotationAxis;
        this.scale = vec3.create();
        this.translateX = 0;
        this.translateY = 0;
        this.scalingVal = 70.0;
        vec3.set(this.translation, this.translateX, this.translateY, 0);
        vec3.set(this.scale, this.scalingVal, this.scalingVal, this.scalingVal);
        this.transform.setScale(this.scale);
        this.transform.setTranslate(this.translation);
        this.transform.setRotate(this.rotationAxis, this.rotationAngle);
        this.transform.updateMVPMatrix();

        this.proj = proj;

        this.eye = vec3.fromValues(camera.eye.x, camera.eye.y, camera.eye.z);
        this.center = vec3.fromValues(camera.center.x, camera.center.y, camera.center.z);
        this.up = vec3.fromValues(camera.up.x, camera.up.y, camera.up.z);

        this.selectedColor = vec4.fromValues(0.1, 0.1, 0.1, 1);
    }

    draw(shader, toggle)
    {
        const modelUniform = shader.uniform("Model");
        shader.setUniformMatrix4fv(modelUniform, this.transform.getModelMatrix());
        
        const project = mat4.create();
        // mat4.ortho(project, this.proj['left'], this.proj['right'], this.proj['bottom'], this.proj['top'], this.proj['near'], this.proj['far']);
        mat4.perspective(project, this.proj.fovy, this.proj.aspect, this.proj.near, this.proj.far);
        
        const projectUniform = shader.uniform("Project");
        shader.setUniformMatrix4fv(projectUniform, project);

        const view = mat4.create();
        mat4.lookAt(view, this.eye, this.center, this.up);
        const viewUniform = shader.uniform("View");
        shader.setUniformMatrix4fv(viewUniform, view);
        
        let elementPerVertex = 3;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexAttributesBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexAttributesData, this.gl.DYNAMIC_DRAW);

        const aPosition = shader.attribute("aPosition");
        this.gl.enableVertexAttribArray(aPosition);
        this.gl.vertexAttribPointer(aPosition, elementPerVertex, this.gl.FLOAT, false, 0,0)

        const u_color = shader.uniform("u_color");
        if(toggle == false)
        {
            this.gl.uniform4fv(u_color, this.color);
        }
        else
        {
            this.gl.uniform4fv(u_color, this.selectedColor);
        }
        const indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndices, this.gl.DYNAMIC_DRAW);

        this.gl.drawElements(this.gl.TRIANGLES, this.vertexIndices.length, this.gl.UNSIGNED_SHORT, indexBuffer); 
    }

    getScale()
    {
        return this.scale;
    }
    
    setScale(scale)
    {
        this.scalingVal = scale;
        this.scale = vec3.fromValues(this.scalingVal, this.scalingVal, this.scalingVal);
        this.transform.setScale(this.scale);
        this.transform.updateMVPMatrix();
    }

    updateCamera(camera)
    {
        this.eye = vec3.fromValues(camera.eye.x, camera.eye.y, camera.eye.z);
        this.center = vec3.fromValues(camera.center.x, camera.center.y, camera.center.z);
        this.up = vec3.fromValues(camera.up.x, camera.up.y, camera.up.z);
    }
    
    getColor()
    {
        return this.color;
    }
};