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
        for (var i=0; i < transforms.length; i++){
            tranform_matrices.push(transforms[i].mat4x4);
            console.log(transforms[i].mat4x4);
        }
    }
    compound_transform = Matrix.multiply(tranform_matrices);   
    return compound_transform;
}

// automatically called whenever compound transform changes
function CalculateTransformedVertex(vertex) {
    // multiple vertex by compound_transform
    var transform_matrices = [compound_transform, vertex];
    final_vertex = Matrix.multiply(transform_matrices)
    
    return final_vertex;
}

// automatically called whenever user modifies a transform (changes type or values)
function ChangeTransform(index, type, values) {
    app.transforms[index].type = type;
    console.log(type);
    console.log(values);
    // app.transforms[index].mat4x4 = Mat4x4Translate(type, values);

    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}
