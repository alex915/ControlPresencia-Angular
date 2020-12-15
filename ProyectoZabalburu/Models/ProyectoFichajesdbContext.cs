using System;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace WebAPIFichajes.Models
{
    public partial class ProyectoFichajesdbContext : DbContext
    {
        public ProyectoFichajesdbContext()
        {
        }

        public ProyectoFichajesdbContext(DbContextOptions<ProyectoFichajesdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Centro> Centros { get; set; }
        public virtual DbSet<Cliente> Clientes { get; set; }
        public virtual DbSet<Diassinfichar> Diassinfichar { get; set; }
        public virtual DbSet<Dispositivo> Dispositivos { get; set; }
        public virtual DbSet<Empleado> Empleados { get; set; }
        public virtual DbSet<Fichaje> Fichajes { get; set; }
        public virtual DbSet<IncidenciaModem> IncidenciaModem { get; set; }
        public virtual DbSet<IncidenciaReloj> IncidenciasRelojes { get; set; }
        public virtual DbSet<Modem> Modem { get; set; }
        public virtual DbSet<Perfiles> Perfiles { get; set; }
        public virtual DbSet<Reloj> Relojes { get; set; }
        public virtual DbSet<V1diaSinFichar> V1diaSinFichar { get; set; }
        public virtual DbSet<V2diasSinFichar> V2diasSinFichar { get; set; }
        public virtual DbSet<V3diasSinFichar> V3diasSinFichar { get; set; }

 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Centro>(entity =>
            {
                entity.ToTable("centros");
                entity.HasKey(e => e.IdCentro)
                    .HasName("PK__Centros__20ACC134CC796DD7");

               // entity.Property(e => e.IdCentro).ValueGeneratedNever();

                entity.Property(e => e.CodigoCtrTrabajo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Cp)
                    .HasColumnName("CP")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Estado)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Poblacion)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.CodClienteNavigation)
                    .WithMany(p => p.Centros)
                    .HasForeignKey(d => d.CodCliente)
                    .HasConstraintName("FK__Centros__CodClie__66603565");
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.ToTable("clientes");
                entity.HasKey(e => e.IdCliente)
                    .HasName("PK_clientes");

                entity.Property(e => e.IdCliente)
                    .HasColumnName("idCliente");
                    //.ValueGeneratedNever();

                entity.Property(e => e.CodigoCliente)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Estado)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Diassinfichar>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("diassinfichar");
            });

            modelBuilder.Entity<Dispositivo>(entity =>
            {
                entity.ToTable("dispositivos");
                entity.HasKey(e => e.IdDispositivo)
                    .HasName("PK__Disposit__B1EDB8E4BA0A33FE");

                entity.Property(e => e.Codigo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Estado)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IdModem).HasColumnName("idModem");

                entity.HasOne(d => d.CodCentroNavigation)
                    .WithMany(p => p.Dispositivos)
                    .HasForeignKey(d => d.CodCentro)
                    .HasConstraintName("FK__Dispositi__CodCe__6754599E");

                entity.HasOne(d => d.IdModemNavigation)
                    .WithMany(p => p.Dispositivos)
                    .HasForeignKey(d => d.IdModem)
                    .HasConstraintName("FK_Dispositivos_Modem");
            });

            modelBuilder.Entity<Empleado>(entity =>
            {
                entity.ToTable("empleados");
                entity.HasKey(e => e.EmpleadoId);

                entity.Property(e => e.EmpleadoId).HasColumnName("empleadoId");

                entity.Property(e => e.Cp)
                    .HasColumnName("CP")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Direccion)
                    .HasColumnName("direccion")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Dni)
                    .HasColumnName("dni")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FechaAlta)
                    .HasColumnName("fechaAlta")
                    .HasColumnType("date");

                entity.Property(e => e.FechaNacimiento)
                    .HasColumnName("fechaNacimiento")
                    .HasColumnType("date");

                entity.Property(e => e.IdCentro).HasColumnName("idCentro");

                entity.Property(e => e.Email)
                    .HasColumnName("mail")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Municipio)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NumeroVia)
                    .HasColumnName("numeroVia")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PrimerApellido)
                    .HasColumnName("primerApellido")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Provincia)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SegundoApellido)
                    .HasColumnName("segundoApellido")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Telefono)
                    .HasColumnName("telefono")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdCentroNavigation)
                    .WithMany(p => p.Empleados)
                    .HasForeignKey(d => d.IdCentro)
                    .HasConstraintName("FK_Empleados_Centros");
            });

            modelBuilder.Entity<Fichaje>(entity =>
            {
                entity.ToTable("fichajes");
                entity.Property(e => e.CodTipoFichaje)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Estado)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Latitud)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Longitud)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.CodEmpleadoNavigation)
                    .WithMany(p => p.Fichajes)
                    .HasForeignKey(d => d.CodEmpleado)
                    .HasConstraintName("FK_Fichajes_Empleados");

                entity.HasOne(d => d.IdDispositivoNavigation)
                    .WithMany(p => p.Fichajes)
                    .HasForeignKey(d => d.IdDispositivo)
                    .HasConstraintName("FK_Fichajes_Dispositivos");
            });

            modelBuilder.Entity<IncidenciaModem>(entity =>
            {
                entity.HasKey(e => e.IdIncidenciasModem);

                entity.Property(e => e.IdIncidenciasModem)
                    .HasColumnName("idIncidenciasModem");
                    //.ValueGeneratedNever();

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fechaCreacion")
                    .HasColumnType("date");

                entity.Property(e => e.FechaSolucion)
                    .HasColumnName("fechaSolucion")
                    .HasColumnType("date");

                entity.Property(e => e.Gravedad)
                    .HasColumnName("gravedad")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Modem).HasColumnName("modem");

                entity.Property(e => e.Motivo)
                    .HasColumnName("motivo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observaciones)
                    .HasColumnName("observaciones")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ResponsableIncidencia)
                    .HasColumnName("responsableIncidencia")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ResponsableSolucion)
                    .HasColumnName("responsableSolucion")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Telefono)
                    .HasColumnName("telefono")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.ModemNavigation)
                    .WithMany(p => p.IncidenciaModem)
                    .HasForeignKey(d => d.Modem)
                    .HasConstraintName("FK_IncidenciaModem_Modem");
            });

            modelBuilder.Entity<IncidenciaReloj>(entity =>
            {
                entity.ToTable("incidenciasrelojes");
                entity.HasNoKey();

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fechaCreacion")
                    .HasColumnType("date");

                entity.Property(e => e.FechaSolucion)
                    .HasColumnName("fechaSolucion")
                    .HasColumnType("date");

                entity.Property(e => e.Gravedad)
                    .HasColumnName("gravedad")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IdIncidenciasReloj).HasColumnName("idIncidenciasReloj");

                entity.Property(e => e.Motivo)
                    .HasColumnName("motivo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observaciones)
                    .HasColumnName("observaciones")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.Reloj).HasColumnName("reloj");

                entity.Property(e => e.ResponsableIncidencia)
                    .HasColumnName("responsableIncidencia")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ResponsableSolucion)
                    .HasColumnName("responsableSolucion")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Telefono)
                    .HasColumnName("telefono")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.RelojNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.Reloj)
                    .HasConstraintName("FK_IncidenciasRelojes_Relojes");
            });

            modelBuilder.Entity<Modem>(entity =>
            {
                entity.HasKey(e => e.IdModem);

                entity.Property(e => e.IdModem)
                    .HasColumnName("idModem");
                    //.ValueGeneratedNever();

                entity.Property(e => e.Clave)
                    .HasColumnName("clave")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Fabricante)
                    .HasColumnName("fabricante")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Ip)
                    .HasColumnName("ip")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Linea)
                    .HasColumnName("linea")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Modelo)
                    .HasColumnName("modelo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Proveedor)
                    .HasColumnName("proveedor")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Puerto)
                    .HasColumnName("puerto")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Sim)
                    .HasColumnName("SIM")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Ssid)
                    .HasColumnName("ssid")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Titular)
                    .HasColumnName("titular")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Perfiles>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("perfiles");

                entity.HasIndex(e => e.Dni)
                    .HasName("UQ__perfiles__C035B8DDAE985FA1")
                    .IsUnique();

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__perfiles__A9D105340990B9F6")
                    .IsUnique();

                entity.HasIndex(e => e.Iban)
                    .HasName("UQ__perfiles__8235CCBCE31858F2")
                    .IsUnique();

                entity.HasIndex(e => e.NombreCompleto)
                    .HasName("UQ__perfiles__721464C4E6CCAEF2")
                    .IsUnique();

                entity.HasIndex(e => e.NombreUsuario)
                    .HasName("UQ__perfiles__6B0F5AE042117898")
                    .IsUnique();

                entity.HasIndex(e => e.Ssn)
                    .HasName("UQ__perfiles__CA1E8E3C0F074C92")
                    .IsUnique();

                entity.HasIndex(e => e.Telefono)
                    .HasName("UQ__perfiles__4EC504808AA9F198")
                    .IsUnique();

                entity.Property(e => e.Apellido1)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Apellido2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Bic)
                    .HasColumnName("BIC")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Cp)
                    .HasColumnName("CP")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Direccion)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Dni)
                    .HasColumnName("DNI")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FechaNacimiento).HasColumnType("date");

                entity.Property(e => e.Iban)
                    .HasColumnName("IBAN")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Municipio)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NombreCompleto)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NombreUsuario)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NumeroVia)
                    .HasColumnName("numero_via")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Provincia)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Ssn)
                    .HasColumnName("SSN")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Telefono)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Reloj>(entity =>
            {
                entity.ToTable("relojes");
                entity.HasKey(e => e.IdReloj);

                entity.Property(e => e.IdReloj)
                    .HasColumnName("idReloj");
                   // .ValueGeneratedNever();

                entity.Property(e => e.Caja).HasColumnName("caja");

                entity.Property(e => e.Cliente).HasColumnName("cliente");

                entity.Property(e => e.Contacto)
                    .HasColumnName("contacto")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Fabricante)
                    .HasColumnName("fabricante")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FechaEntrega)
                    .HasColumnName("fechaEntrega")
                    .HasColumnType("date");

                entity.Property(e => e.FechaEnvio)
                    .HasColumnName("fechaEnvio")
                    .HasColumnType("date");

                entity.Property(e => e.FechaInstalacionFisica)
                    .HasColumnName("fechaInstalacionFisica")
                    .HasColumnType("date");

                entity.Property(e => e.FechcaInstalacionSoftware)
                    .HasColumnName("fechcaInstalacionSoftware")
                    .HasColumnType("date");

                entity.Property(e => e.IdRouter).HasColumnName("idRouter");

                entity.Property(e => e.LicenciaFuturaManagerProduccion)
                    .HasColumnName("licenciaFuturaManagerProduccion")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LicenciaFuturaManagerRis)
                    .HasColumnName("licenciaFuturaManagerRIS")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LicenciaFuturaServidor)
                    .HasColumnName("licenciaFuturaServidor")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Mac)
                    .HasColumnName("MAC")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MailContacto)
                    .HasColumnName("mailContacto")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Modelo)
                    .HasColumnName("modelo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observaciones)
                    .HasColumnName("observaciones")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.Oficina)
                    .HasColumnName("oficina")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Proveedor)
                    .HasColumnName("proveedor")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Servidor)
                    .HasColumnName("servidor")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Sn)
                    .HasColumnName("sn")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Software)
                    .HasColumnName("software")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tipo)
                    .HasColumnName("tipo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TipoRed)
                    .HasColumnName("tipoRed")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TipoTarjeta)
                    .HasColumnName("tipoTarjeta")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TlfContacto)
                    .HasColumnName("tlfContacto")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.VersionSoftware)
                    .HasColumnName("versionSoftware")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Zona).HasColumnName("zona");
            });

            modelBuilder.Entity<V1diaSinFichar>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_1DiaSinFichar");
            });

            modelBuilder.Entity<V2diasSinFichar>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_2DiasSinFichar");
            });

            modelBuilder.Entity<V3diasSinFichar>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_3DiasSinFichar");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
