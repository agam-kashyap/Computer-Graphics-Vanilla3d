const vertexShaderSrc= `
    attribute vec3 aPosition;
    
    uniform mat4 Model;
    uniform mat4 View;
    uniform mat4 Project;

    void main() {
        gl_Position = Project * View * Model * vec4(aPosition, 1);
        gl_PointSize = 5.0;
    }
`;

export default vertexShaderSrc;