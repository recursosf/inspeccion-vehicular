function buildPDF(x){
var d=new x.J({unit:"mm",format:"a4"}),W=210,M=14,y=0,c=x.c,f=x.f,GR=[11,110,79],RD=[192,57,43],AM=[196,120,0];
function T(s,px,py,o){d.text(String(s),px,py,o)}
function nb(h){if(y+h>276){d.addPage();y=16}}
function H(s){nb(12);d.setFont("helvetica","bold");d.setFontSize(10);d.setTextColor(GR[0],GR[1],GR[2]);T(s,M,y+4);y+=7}
d.setFillColor(GR[0],GR[1],GR[2]);d.rect(0,0,W,26,"F");
var tx=M;
if(x.logo){d.setFillColor(255,255,255);d.roundedRect(M-2,2,32,22,2,2,"F");var ls=Math.min(28/x.logo.w,19/x.logo.h),lw=x.logo.w*ls,lh=x.logo.h*ls;d.addImage(x.logo.d,"PNG",M-2+(32-lw)/2,2+(22-lh)/2,lw,lh);tx=M+36}
d.setTextColor(255,255,255);d.setFont("helvetica","bold");d.setFontSize(14);T("INSPECCIÓN PREOPERACIONAL DE VEHÍCULOS",tx,12);
d.setFont("helvetica","normal");d.setFontSize(9);T(x.entidad,tx,19);
y=33;
var rows=[["Fecha y hora",f.fecha,"Placa",f.placa],["Conductor",f.cond,"Tipo de vehículo",f.tipo],["Kilometraje",f.km||"-","Actividad / ruta",f.ruta||"-"]];
rows.forEach(function(r){
d.setFontSize(10);d.setFont("helvetica","normal");
var l1=d.splitTextToSize(String(r[1]),56),l2=d.splitTextToSize(String(r[3]),56),h=Math.max(l1.length,l2.length)*4.6+3.4;
nb(h);d.setDrawColor(200,208,216);d.setLineWidth(.2);d.rect(M,y,W-2*M,h);d.line(M+91,y,M+91,y+h);
d.setFont("helvetica","bold");d.setFontSize(8);d.setTextColor(90,107,122);T(r[0],M+2,y+4.4);T(r[2],M+93,y+4.4);
d.setFont("helvetica","normal");d.setFontSize(10);d.setTextColor(30,30,30);d.text(l1,M+32,y+4.6);d.text(l2,M+123,y+4.6);
y+=h});
y+=5;
var est,col;
if(c.crit.length){est="NO APTO PARA SALIR - FALLA CRÍTICA";col=RD}
else if(c.mal.length){est="APTO CON NOVEDADES - REPORTAR A MANTENIMIENTO";col=AM}
else{est="APTO PARA INICIAR ACTIVIDADES";col=GR}
d.setFillColor(col[0],col[1],col[2]);d.roundedRect(M,y,W-2*M,11,2,2,"F");
d.setTextColor(255,255,255);d.setFont("helvetica","bold");d.setFontSize(12);T(est,W/2,y+7.4,{align:"center"});
y+=16;
d.setFont("helvetica","normal");d.setFontSize(8);d.setTextColor(90,107,122);
T("(*) Ítem crítico: si está en Mal, el vehículo no debe salir hasta ser reparado y autorizado.",M,y);y+=5;
var cx={b:150,m:165,n:180};
x.G.forEach(function(g,gi){
nb(18);
d.setFillColor(226,240,234);d.rect(M,y,W-2*M,6.5,"F");
d.setFont("helvetica","bold");d.setFontSize(9);d.setTextColor(GR[0],GR[1],GR[2]);T((gi+1)+". "+g[0],M+2,y+4.5);
d.setFontSize(8);T("Bien",cx.b,y+4.5,{align:"center"});T("Mal",cx.m,y+4.5,{align:"center"});T("N/A",cx.n,y+4.5,{align:"center"});
y+=6.5;
g[1].forEach(function(it,ii){
var v=x.S[gi+"_"+ii],mal=v==="m";
d.setFontSize(9);d.setFont("helvetica",mal?"bold":"normal");
var lines=d.splitTextToSize(it[0]+(it[1]?" (*)":""),116),h=Math.max(lines.length*4.2+2.4,7);
nb(h);
if(mal)d.setTextColor(RD[0],RD[1],RD[2]);else d.setTextColor(30,30,30);
d.text(lines,M+2,y+4.4);
d.setDrawColor(150,160,170);d.setLineWidth(.2);
["b","m","n"].forEach(function(k){
d.rect(cx[k]-2.2,y+(h-4.4)/2,4.4,4.4);
if(v===k){d.setFont("helvetica","bold");d.setFontSize(9);d.setTextColor(k==="m"?RD[0]:GR[0],k==="m"?RD[1]:GR[1],k==="m"?RD[2]:GR[2]);T("X",cx[k],y+(h-4.4)/2+3.5,{align:"center"})}
});
d.setDrawColor(225,230,235);d.line(M,y+h,W-M,y+h);
y+=h});
y+=3});
y+=2;H("Observaciones");
d.setFont("helvetica","normal");d.setFontSize(9);d.setTextColor(30,30,30);
var ol=d.splitTextToSize(f.obs||"Sin observaciones.",W-2*M-2);
ol.forEach(function(l){nb(5);T(l,M+1,y+3.5);y+=4.6});
y+=3;
if(x.P&&x.P.length){
nb(84);H("Evidencia fotográfica");
var px=M;
x.P.forEach(function(p){var s=Math.min(56/p.w,70/p.h),w=p.w*s,h=p.h*s;d.addImage(p.d,"JPEG",px,y,w,h);px+=60});
y+=74}
nb(44);if(x.sig){d.addImage(x.sig,"JPEG",M+8,y+1,60,20);y+=21}else y+=16;
d.setDrawColor(60,60,60);d.setLineWidth(.3);
d.line(M,y,M+80,y);d.line(W-M-80,y,W-M,y);
d.setFont("helvetica","bold");d.setFontSize(9);d.setTextColor(30,30,30);
T("Firma del conductor",M,y+4.5);T("Revisó / Autorizó",W-M-80,y+4.5);
d.setFont("helvetica","normal");d.setFontSize(8);d.setTextColor(90,107,122);
T(f.cond,M,y+8.8);T("Nombre y cargo",W-M-80,y+8.8);
var n=d.getNumberOfPages();
for(var i=1;i<=n;i++){d.setPage(i);d.setFont("helvetica","normal");d.setFontSize(8);d.setTextColor(120,130,140);
T(x.entidad+"  |  Placa "+f.placa+"  |  "+f.fecha,M,290);T("Página "+i+" de "+n,W-M,290,{align:"right"})}
return d}
if(typeof module!=="undefined")module.exports=buildPDF;else window.buildPDF=buildPDF;
