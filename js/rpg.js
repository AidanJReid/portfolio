//channel split

var text = new Blotter.Text("ROT", {
            family: 'Montserrat',
            size: 150,
            fill: "#000",
            paddingLeft: 10,
            paddingRight: 10,
        })

        var material = new Blotter.ChannelSplitMaterial();
        material.uniforms.uOffset.value = 0.05;
        material.uniforms.uRotation.value = 50;
        material.uniforms.uApplyBlur.value = 1; // 0 false, 1 true
        material.uniforms.uAnimateNoise.value = .3;


        var blotter = new Blotter(material, {
            texts: text
        })

        // Apply to element
       let scope = blotter.forText(text);
       let elem = document.getElementById('ChannelSplit');
       scope.appendTo(elem);

        document.onmousemove = moveIt;
        function moveIt(event) {

            material.uniforms.uRotation.value = (event.clientX * .1);
            material.uniforms.uOffset.value = (event.clientX * .0001);

        }