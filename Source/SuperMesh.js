import Transform from './transform.js';
import { vec3, mat4, vec4 } from 'https://cdn.skypack.dev/gl-matrix';

export default class SuperMesh
{
    constructor(gl)
    {
        this.objects = [];
        this.gl = gl;
        this.selectedSubMeshIndex = -1;
    }

    addSubMesh(mesh)
    {
        this.objects.push(mesh);
    }
    getScale()
    {
        return this.objects[0].getScale();
    }
    setScale(scale)
    {
        for(let i in this.objects)
        {
            this.objects[i].transform.setScale(scale);
            // this.objects[i].setScale(scale);
        }
    }
    setTranslate(vecTrans)
    {
        for(let i in this.objects)
        {
            this.objects[i].transform.setTranslate(vecTrans);
        }
    }
    setRotate(rotationAxis, rotationAngle)
    {
        for(let i in this.objects)
        {
            this.objects[i].transform.setRotate(rotationAxis, rotationAngle);
        }
    }
    updateMVPMatrix()
    {
        for(let i in this.objects)
        {
            this.objects[i].transform.updateMVPMatrix();
        }
    }
    draw(shader, toggle)
    {
        // console.log(this.objects);
        for(let i in this.objects)
        {
            if(i == this.selectedSubMeshIndex)
            {
                this.objects[i].draw(shader, true);
            }
            else
            {
                this.objects[i].draw(shader, toggle);
            }
        }
    }
    isFaceSelected(pixels)
    {
        for(let i in this.objects)
        {
            let color = this.objects[i].getColor()
            if(pixels[0] == Math.round(color[0]*255) && pixels[1] == Math.round(color[1]*255) &&
            pixels[2] == Math.round(color[2]*255) && pixels[3] == Math.round(color[3]*255))
            {
                this.selectedSubMeshIndex = i;
                return 1;
            }
        }
        return 0;
    }
    resetSelected()
    {
        this.selectedSubMeshIndex = -1;
    }
    updateCamera(camera)
    {
        for(let i in this.objects)
        {
            this.objects[i].updateCamera(camera);
        }
    }
}

// Set toggle to false when we go to face select mode