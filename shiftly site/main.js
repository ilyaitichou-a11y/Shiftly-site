import * as T from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const c=document.getElementById('bg'),calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
try{
const r=new T.WebGLRenderer({canvas:c,alpha:true,antialias:true});r.setPixelRatio(Math.min(devicePixelRatio,2));
const s=new T.Scene(),cam=new T.PerspectiveCamera(50,1,.1,100);
s.add(new T.AmbientLight(0xffffff,.7));const d=new T.DirectionalLight(0xffffff,2.4);d.position.set(4,5,6);s.add(d);
const mat=(c,m,ro)=>new T.MeshStandardMaterial({color:c,metalness:m,roughness:ro});
const red=mat(0xE5231A,.4,.35),wht=mat(0xffffff,.2,.4),gry=mat(0x2B2B2E,.6,.3);
const items=[[new T.TorusKnotGeometry(1,.3,160,24),red,[2.4,0,0]],
[new T.IcosahedronGeometry(.9),new T.MeshBasicMaterial({color:0xffffff,wireframe:true}),[-3.2,1.6,-2]],
[new T.OctahedronGeometry(.8),gry,[-2.6,-2,0]],[new T.TorusGeometry(1.2,.08,16,80),wht,[3.2,-2.6,-3]],
[new T.BoxGeometry(1.4,.4,.4),red,[-1,3,-1]],[new T.SphereGeometry(.45,32,32),wht,[1,-3,1]]]
.map(([g,m,p])=>{const o=new T.Mesh(g,m);o.userData.p=p;s.add(o);return o});
const size=()=>{r.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};
addEventListener('resize',size);size();let y=0,t=0;
(function loop(){const p=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);
y+=(p-y)*(calm?1:.07);t+=calm?0:.004;
items.forEach((o,i)=>{const[x,h,z]=o.userData.p,a=y*6.28+i;
o.position.set(x*Math.cos(a),h+Math.sin(a)*1.3,z);o.rotation.set(y*7+i+t,y*9+t*2,0)});
cam.position.z=9-y*3;r.render(s,cam);requestAnimationFrame(loop)})();
}catch(e){c.remove()}
