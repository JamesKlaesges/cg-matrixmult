var compound_transform;

// automatically called whenever any transform changes
function CalculateCompoundTransform(transforms) {
    // matrices in `transforms[i].mat4x4`
    // note `transform[0]` is first tranform to apply to vertex
    
    // if only one transform, set compound transform eequal to it
    // otherwise multiply all matrices together (in proper order)
    var tranform_matrices = [];
    if (transforms.length == 1){
        compound_transform = transforms[0].mat4x4;
    }
    else{
        for (var i=0; i > transforms.length; i++){
            tranform_matrices.push(transforms[i].mat4x4);
        }
        compound_transform = Matrix.multiply(tranform_matrices);   
    }
    
    return compound_transform;
}

// automatically called whenever compound transform changes
function CalculateTransformedVertex(vertex) {
    // multiple vertex by compound_transform
    var transform_matrices = [];
    transform_matrices.push(compound_transform);
    transform_matrices.push(vertex);
    var final_vertex = Matrix.multiply(transform_matrices);
    
    return final_vertex;
}

// automatically called whenever user modifies a transform (changes type or values)
function ChangeTransform(index, type, values) {
    var mat4x4 = app.transforms[index].mat4x4;
    app.transforms[index].type = type;
    if (type == "translate"){
        app.transforms[index].mat4x4 = Mat4x4Translate(mat4x4, values[0], values[1], values[2]);
    }
    else if (type == "scale"){
        app.transforms[index].mat4x4 = Mat4x4Scale(mat4x4, values[0], values[1], values[2]);
    }
    else if (type == "rotate_x"){
        app.transforms[index].mat4x4 = Mat4x4RotateX(mat4x4, values[0]);
    }
    else if (type == "rotate_y"){
        app.transforms[index].mat4x4 = Mat4x4RotateY(mat4x4, values[0]);
    }
    else if (type == "rotate_z"){
        app.transforms[index].mat4x4 = Mat4x4RotateZ(mat4x4, values[0]);
    }
    else if (type == "shear"){
        app.transforms[index].mat4x4 = Mat4x4ShearXY(mat4x4, values[0], values[1]);
    }

    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}
