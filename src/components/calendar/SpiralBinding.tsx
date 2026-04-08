const SpiralBinding = () => {
  const count = 24;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "26px",
        background: "white",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: "0px",
        zIndex: 10,
      }}
    >
      {/* Center hook */}
      <div
        style={{
          position: "absolute",
          top: "1px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "16px",
          height: "20px",
          borderRadius: "8px 8px 0 0",
          border: "3px solid #444",
          borderBottom: "none",
          zIndex: 20,
          background: "white",
        }}
      />

      {/* Coils */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "flex-end",
          width: "100%",
          justifyContent: "center",
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "12px",
              height: "18px",
              borderRadius: "6px 6px 0 0",
              border: "2px solid #aaa",
              borderBottom: "none",
              flexShrink: 0,
              background: "transparent",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SpiralBinding;
